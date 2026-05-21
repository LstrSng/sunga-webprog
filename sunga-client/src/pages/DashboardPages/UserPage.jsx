import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../../contexts/AuthContext';
import { createUser, deleteUser, fetchUsers, updateUser } from '../../services/userService';
import {
    actionButtonGroupSx,
    deleteActionButtonSx,
    editActionButtonSx,
    primaryDashboardButtonSx,
    secondaryDashboardButtonSx,
    statusActionButtonSx,
} from '../../utils/dashboardButtonStyles';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 'calc(100vw - 32px)', sm: 620 },
    maxHeight: 'calc(100vh - 48px)',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2.5, sm: 3 },
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};

const formGridSx = {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
    gap: 1.5,
};

const panelSx = {
    borderRadius: 3,
    border: '1px solid rgba(212, 212, 216, 0.9)',
    boxShadow: '0 12px 30px rgba(24, 24, 27, 0.06)',
};

const formatRole = (role) => role ? role.charAt(0).toUpperCase() + role.slice(1) : '';
const getAuthRole = (auth) => (auth?.role || auth?.type || '').toLowerCase();

const normalizeUserRow = (user, index = 0) => {
    const role = (user.role || user.type || 'viewer').toLowerCase();
    const emailUsername = user.email?.split('@')[0] || `user${index + 1}`;

    return {
        ...user,
        _id: user._id || user.id || `user-${index + 1}`,
        displayId: index + 1,
        firstName: user.firstName || emailUsername,
        lastName: user.lastName || '',
        age: user.age || '',
        gender: user.gender || '',
        contactNumber: user.contactNumber || '',
        email: user.email || '',
        role,
        type: role,
        username: user.username || emailUsername,
        password: '',
        address: user.address || '',
        isActive: user.isActive ?? true,
        name: `${user.firstName || emailUsername} ${user.lastName || ''}`.trim(),
    };
};

const emptyUser = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'viewer',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const UsersPage = () => {
    const { auth } = useAuth();
    const canManageUsers = getAuthRole(auth) === 'admin';
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(emptyUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const loadUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchUsers();
            setUsers((data.users || []).map(normalizeUserRow));
        } catch (err) {
            setError(err.message || 'Unable to load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const query = search.trim().toLowerCase();
        const matchesSearch =
            !query ||
            user.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query);
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && user.isActive) ||
            (statusFilter === 'inactive' && !user.isActive);

        return matchesSearch && matchesStatus;
    });

    const handleOpen = () => {
        if (!canManageUsers) return;
        setFormError('');
        setIsEditing(false);
        setNewUser(emptyUser);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false);
        setEditUserId(null);
        setFormError('');
    };

    const handleEdit = (id) => {
        if (!canManageUsers) return;
        const userToEdit = users.find((user) => user._id === id);
        if (userToEdit) {
            setNewUser({ ...userToEdit, password: '' });
            setEditUserId(id);
            setIsEditing(true);
            setOpen(true);
        }
    };

    const handleSaveUser = async () => {
        if (!canManageUsers) return;
        const userToSave = {
            ...newUser,
            firstName: newUser.firstName.trim(),
            lastName: newUser.lastName.trim(),
            age: String(newUser.age || '').trim(),
            gender: newUser.gender.trim(),
            contactNumber: newUser.contactNumber.trim(),
            email: newUser.email.trim().toLowerCase(),
            username: newUser.username.trim(),
            address: newUser.address.trim() || 'N/A',
            type: newUser.role,
            name: `${newUser.firstName || ''} ${newUser.lastName || ''}`.trim(),
        };

        try {
            setError('');
            setFormError('');
            if (isEditing) {
                const updatedUser = { ...userToSave };
                if (!updatedUser.password) {
                    delete updatedUser.password;
                }
                const savedUser = await updateUser(editUserId, updatedUser);
                setUsers((currentUsers) =>
                    currentUsers.map((user, index) =>
                        user._id === editUserId ? normalizeUserRow(savedUser, index) : user
                    )
                );
            } else {
                const savedUser = await createUser(userToSave);
                setUsers((currentUsers) => [
                    ...currentUsers,
                    normalizeUserRow(savedUser, currentUsers.length),
                ]);
            }
            handleClose();
        } catch (err) {
            setFormError(err.message || 'Unable to save user.');
        }
    };

    const handleToggleActive = async (id, isActive) => {
        if (!canManageUsers) return;
        try {
            setError('');
            const savedUser = await updateUser(id, { isActive: !isActive });
            setUsers((currentUsers) =>
                currentUsers.map((user, index) =>
                    user._id === id ? normalizeUserRow(savedUser, index) : user
                )
            );
        } catch (err) {
            setError(err.message || 'Unable to update user status.');
        }
    };

    const handleDelete = async (id) => {
        if (!canManageUsers) return;
        const userToDelete = users.find((user) => user._id === id);
        if (!userToDelete) return;

        const confirmed = window.confirm(`Delete ${userToDelete.name || userToDelete.email}?`);
        if (!confirmed) return;

        try {
            setError('');
            await deleteUser(id);
            setUsers((currentUsers) =>
                currentUsers
                    .filter((user) => user._id !== id)
                    .map((user, index) => ({ ...user, displayId: index + 1 }))
            );
        } catch (err) {
            setError(err.message || 'Unable to delete user.');
        }
    };

    const columns = [
        {
            field: 'displayId',
            headerName: 'ID',
            width: 90,
        },
        {
            field: 'name',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 180,
        },
        { field: 'username', headerName: 'Username', flex: 1, minWidth: 170 },
        {
            field: 'role',
            headerName: 'Role',
            flex: 0.6,
            minWidth: 130,
            renderCell: (params) => formatRole(params.row.role),
        },
        {
            field: 'isActive',
            headerName: 'Status',
            flex: 0.6,
            minWidth: 130,
            sortable: false,
            renderCell: (params) => (
                <Chip
                    label={params.row.isActive ? 'Active' : 'Inactive'}
                    color={params.row.isActive ? 'success' : 'default'}
                    size="small"
                    variant={params.row.isActive ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 700 }}
                />
            ),
        },
        ...(canManageUsers ? [{
            field: 'actions',
            headerName: 'Actions',
            width: 280,
            minWidth: 280,
            sortable: false,
            renderCell: (params) => (
                <Box sx={actionButtonGroupSx}>
                    <Button
                        variant="outlined"
                        onClick={() => handleEdit(params.row._id)}
                        sx={editActionButtonSx}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleToggleActive(params.row._id, params.row.isActive)}
                        sx={statusActionButtonSx}
                    >
                        {params.row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleDelete(params.row._id)}
                        sx={deleteActionButtonSx}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        }] : []),
    ];

    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#18181b' }}>
                    Users
                </Typography>
                {canManageUsers && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpen}
                        sx={primaryDashboardButtonSx}
                    >
                        Add User
                    </Button>
                )}
            </Stack>
            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            <Paper sx={{ ...panelSx, p: 2, mb: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search Users"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 220 } }}>
                        <InputLabel id="user-status-filter-label">Status Filter</InputLabel>
                        <Select
                            labelId="user-status-filter-label"
                            label="Status Filter"
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                        >
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Paper>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="add-user-modal"
                aria-describedby="add-user-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="keep-mounted-modal-title" variant="subtitle1" fontWeight={700}>
                        {isEditing ? 'Edit User' : 'Add User'}
                    </Typography>
                    <Box
                        id="transition-modal-description"
                        sx={{ mt: 2, pr: 0.5, overflowY: 'auto' }}
                    >
                        <Box sx={formGridSx}>
                            <TextField fullWidth size="small" label="First Name" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                            <TextField fullWidth size="small" label="Last Name" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                            <TextField fullWidth size="small" label="Age" value={newUser.age} onChange={(e) => setNewUser({ ...newUser, age: e.target.value })} />
                            <FormControl fullWidth size="small">
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select labelId="gender-label" label="Gender" value={newUser.gender} onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField fullWidth size="small" label="Contact Number" value={newUser.contactNumber} onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })} />
                            <TextField fullWidth size="small" label="Email Address" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                            <FormControl fullWidth size="small">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select labelId="role-label" label="Role" value={newUser.role || 'viewer'} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="editor">Editor</MenuItem>
                                    <MenuItem value="viewer">Viewer</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField fullWidth size="small" label="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                            <TextField fullWidth size="small" label="Password" type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }} />
                            <TextField fullWidth size="small" label="Address" multiline minRows={3} value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} sx={{ gridColumn: '1 / -1' }} />
                        </Box>
                        {formError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {formError}
                            </Typography>
                        )}
                    </Box>
                    <Stack direction="row" alignItems="center" sx={{ mt: 2 }}>
                        <Switch
                            checked={newUser.isActive}
                            onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
                        />
                        <Typography variant="body2">User status: {newUser.isActive ? 'Active' : 'Inactive'}</Typography>
                    </Stack>
                    <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ mt: 3, flexShrink: 0 }}>
                        <Button size="small" onClick={handleClose} sx={secondaryDashboardButtonSx}>
                            Cancel
                        </Button>
                        <Button size="small" variant="contained" onClick={handleSaveUser} sx={primaryDashboardButtonSx}>
                            Save User
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            <Box sx={{ ...panelSx, height: 500, width: '100%', mt: 2, overflow: 'hidden', bgcolor: 'background.paper' }}>
                <DataGrid
                    rows={filteredUsers}
                    columns={columns}
                    getRowId={(row) => row._id}
                    loading={loading}
                    rowHeight={58}
                    columnHeaderHeight={60}
                    pageSize={10}
                    rowsPerPageOptions={[10, 20, 50]}
                    disableSelectionOnClick
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#fafafa',
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: '#fafafa',
                        },
                        '& .MuiDataGrid-cell': {
                            alignItems: 'center',
                            display: 'flex',
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 700,
                        },
                    }}
                />
            </Box>
        </>
    );
};

export default UsersPage;
