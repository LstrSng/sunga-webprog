import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../contexts/AuthContext';
import { DEFAULT_ARTICLE_IMAGE } from '../../utils/localArticles';
import {
  createArticle,
  deleteArticle,
  fetchArticles,
  updateArticle,
  updateArticleStatus,
} from '../../services/articleService';
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

const emptyArticle = {
  slug: '',
  title: '',
  image: DEFAULT_ARTICLE_IMAGE,
  content: '',
  isActive: true,
};

const panelSx = {
  borderRadius: 3,
  border: '1px solid rgba(212, 212, 216, 0.9)',
  boxShadow: '0 12px 30px rgba(24, 24, 27, 0.06)',
};

const getAuthRole = (auth) => (auth?.role || auth?.type || '').toLowerCase();

const createArticleRows = (articles) =>
  articles.map((article, index) => ({
    id: article._id || article.id,
    number: index + 1,
    title: article.title || 'Untitled Article',
    preview: article.content?.[0]?.slice(0, 120) || '',
    paragraphs: article.content?.length || 0,
    content: Array.isArray(article.content) ? article.content.join('\n') : article.content || '',
    slug: article.slug || article.name || article._id || article.id,
    name: article.name || article.slug || article._id || article.id,
    image: article.image || DEFAULT_ARTICLE_IMAGE,
    isActive: article.isActive ?? true,
  }));

const DashArticleListPage = () => {
  const { auth } = useAuth();
  const authRole = getAuthRole(auth);
  const canEditArticles = authRole === 'admin';
  const canToggleArticles = ['admin', 'editor'].includes(authRole);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articleForm, setArticleForm] = useState(emptyArticle);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadArticles = async () => {
    setLoading(true);
    setError('');

    try {
      const articles = await fetchArticles();
      setRows(createArticleRows(articles));
    } catch (err) {
      setError(err.message || 'Unable to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredRows = rows.filter((row) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      row.slug.toLowerCase().includes(query) ||
      row.title.toLowerCase().includes(query) ||
      row.preview.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && row.isActive) ||
      (statusFilter === 'inactive' && !row.isActive);

    return matchesSearch && matchesStatus;
  });

  const handleOpen = () => {
    if (!canEditArticles) return;
    setIsEditing(false);
    setEditArticleId(null);
    setArticleForm(emptyArticle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    if (!canEditArticles) return;
    const articleToEdit = rows.find((row) => row.id === id);
    if (!articleToEdit) return;

    setArticleForm({
      slug: articleToEdit.slug,
      title: articleToEdit.title,
      image: articleToEdit.image || DEFAULT_ARTICLE_IMAGE,
      content: articleToEdit.content,
      isActive: articleToEdit.isActive,
    });
    setEditArticleId(id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSaveArticle = async () => {
    if (!canEditArticles) return;
    setSaving(true);
    setError('');

    const content = articleForm.content
      .split('\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const slug = articleForm.slug.trim() || articleForm.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const articleToSave = {
      slug,
      name: slug,
      title: articleForm.title.trim(),
      image: articleForm.image.trim() || DEFAULT_ARTICLE_IMAGE,
      content,
      isActive: articleForm.isActive,
    };

    try {
      if (isEditing) {
        await updateArticle(editArticleId, articleToSave);
      } else {
        await createArticle(articleToSave);
      }

      await loadArticles();
      handleClose();
    } catch (err) {
      setError(err.message || 'Unable to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    if (!canToggleArticles) return;
    setError('');

    try {
      await updateArticleStatus(id, !isActive);
      await loadArticles();
    } catch (err) {
      setError(err.message || 'Unable to update article status');
    }
  };

  const handleDeleteArticle = async (id, title) => {
    if (!canEditArticles) return;

    const shouldDelete = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!shouldDelete) return;

    setError('');

    try {
      await deleteArticle(id);
      await loadArticles();
    } catch (err) {
      setError(err.message || 'Unable to delete article');
    }
  };

  const columns = [
    {
      field: 'number',
      headerName: 'ID',
      width: 100,
    },
    { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 180 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1.2,
      minWidth: 280,
    },
    {
      field: 'paragraphs',
      headerName: 'Paragraphs',
      flex: 0.6,
      minWidth: 120,
    },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.4,
      minWidth: 220,
      sortable: false,
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
    ...(canToggleArticles ? [{
      field: 'actions',
      headerName: 'Actions',
      width: 280,
      minWidth: 280,
      sortable: false,
      renderCell: (params) => (
        <Box sx={actionButtonGroupSx}>
          {canEditArticles && (
            <Button
              variant="outlined"
              onClick={() => handleEdit(params.row.id)}
              sx={editActionButtonSx}
            >
              Edit
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => handleToggleActive(params.row.id, params.row.isActive)}
            sx={statusActionButtonSx}
          >
            {params.row.isActive ? 'Disable' : 'Activate'}
          </Button>
          {canEditArticles && (
            <Button
              variant="contained"
              onClick={() => handleDeleteArticle(params.row.id, params.row.title)}
              sx={deleteActionButtonSx}
            >
              Delete
            </Button>
          )}
        </Box>
      ),
    }] : []),
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#18181b' }}>
          Articles
        </Typography>
        {canEditArticles && (
          <Button variant="contained" onClick={handleOpen} sx={primaryDashboardButtonSx}>
            Add Article
          </Button>
        )}
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ ...panelSx, p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search Articles"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 180 } }}>
            <InputLabel id="article-status-filter-label">Status Filter</InputLabel>
            <Select
              labelId="article-status-filter-label"
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

      <Paper sx={{ ...panelSx, p: 2 }}>
        <Box sx={{ height: 520, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            rowHeight={58}
            columnHeaderHeight={60}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
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
      </Paper>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="article-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="article-modal-title" variant="subtitle1" fontWeight={700}>
            {isEditing ? 'Edit Article' : 'Add Article'}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5, mt: 2, overflowY: 'auto' }}>
            <TextField
              fullWidth
              size="small"
              label="Slug"
              value={articleForm.slug}
              onChange={(event) => setArticleForm({ ...articleForm, slug: event.target.value })}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="article-status-label">Status</InputLabel>
              <Select
                labelId="article-status-label"
                label="Status"
                value={articleForm.isActive ? 'active' : 'inactive'}
                onChange={(event) =>
                  setArticleForm({ ...articleForm, isActive: event.target.value === 'active' })
                }
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              size="small"
              label="Title"
              value={articleForm.title}
              onChange={(event) => setArticleForm({ ...articleForm, title: event.target.value })}
              sx={{ gridColumn: '1 / -1' }}
            />
            <TextField
              fullWidth
              size="small"
              label="Image URL"
              value={articleForm.image}
              onChange={(event) => setArticleForm({ ...articleForm, image: event.target.value })}
              sx={{ gridColumn: '1 / -1' }}
            />
            <TextField
              fullWidth
              size="small"
              label="Paragraphs"
              multiline
              minRows={5}
              value={articleForm.content}
              onChange={(event) => setArticleForm({ ...articleForm, content: event.target.value })}
              sx={{ gridColumn: '1 / -1' }}
            />
          </Box>
          <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button size="small" onClick={handleClose} sx={secondaryDashboardButtonSx}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleSaveArticle}
              disabled={saving}
              sx={primaryDashboardButtonSx}
            >
              {saving ? 'Saving...' : 'Save Article'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;
