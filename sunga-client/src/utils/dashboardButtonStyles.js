const baseActionButtonSx = {
  height: 34,
  borderRadius: 999,
  px: 0,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 0,
  lineHeight: 1,
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

export const actionButtonGroupSx = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.75,
  width: '100%',
  minWidth: 0,
  overflow: 'hidden',
};

export const editActionButtonSx = {
  ...baseActionButtonSx,
  width: 64,
  minWidth: 64,
  borderColor: '#a1a1aa',
  color: '#27272a',
  '&:hover': {
    borderColor: '#27272a',
    backgroundColor: 'rgba(39, 39, 42, 0.04)',
  },
};

export const statusActionButtonSx = {
  ...baseActionButtonSx,
  width: 96,
  minWidth: 96,
  backgroundColor: '#d97706',
  boxShadow: '0 6px 12px rgba(217, 119, 6, 0.22)',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b45309',
    boxShadow: '0 8px 16px rgba(217, 119, 6, 0.26)',
  },
};

export const deleteActionButtonSx = {
  ...baseActionButtonSx,
  width: 82,
  minWidth: 82,
  backgroundColor: '#dc2626',
  boxShadow: '0 6px 12px rgba(220, 38, 38, 0.2)',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b91c1c',
    boxShadow: '0 8px 16px rgba(220, 38, 38, 0.24)',
  },
};

export const primaryDashboardButtonSx = {
  minHeight: 40,
  borderRadius: 999,
  px: 2.5,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: 'uppercase',
};

export const secondaryDashboardButtonSx = {
  minHeight: 40,
  borderRadius: 999,
  px: 2.5,
  fontWeight: 700,
  letterSpacing: 0,
  textTransform: 'uppercase',
};
