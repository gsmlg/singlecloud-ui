const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
  },
  title: {
    flexGrow: 1,
  },
  select: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  grid: {
    padding: theme.spacing(2),
  },
  contentGrid: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  appContainer: {},
  advanceContainer: {},
  actionContainer: {
    textAlign: 'right',
  },
  h5: {
    marginBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    flexBasis: 200,
  },
  padding10: {
    padding: '10px',
  },
  marginRight10: {
    marginRight: '10px',
  },
  formControl: {
    margin: theme.spacing(1),
    flexBasis: 200,
    minWidth: 194,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addContainerWrap: {
    minHeight: '75px',
  },
  addContainerButton: {
    alignSelf: 'center',
  },
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  separateLineWrap: {
    marginTop: '8px',
    marginRight: '5px',
    background: '#eee',
  },
  separateLine: {
    marginTop: '8px',
    boxShadow: '1px 0px 2px #ccc',
    border: '1px solid #ccc',
  },
  removeBtn: {
    float: 'right',
  },
  createBtnLink: {
    position: 'absolute',
    top: '3px',
    right: '10px',
  },
  radioControl: {
    flexDirection: 'row',
  },
  radioLabel: {
    flexDirection: 'row',
    lineHeight: 3,
  },
  radioGroup: {
    flexDirection: 'row',
    marginLeft: '2rem',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    position: 'absolute',
    right: 0,
    top: 6,
  },
  tableWrapper: {
    overflow: 'auto',
  },
  infoCardHeader: {
    height: 106,
    '& :last-child': {
      '& div': {
        borderRight: 'none',
      },
    },
  },
  infoCardText: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #E8E8E8',
    '& h3': {
      color: '#000',
      fontSize: 24,
      fontWeight: 'normal',
      lineHeight: '32px',
    },
    '& p': {
      fontSize: 14,
      color: '#838383',
      margin: 0,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },
  },
  cardHeaderLine: {
    justifyContent: 'center',
    borderBottom: '1px #DFE0DF solid',
    padding: '0 !important',
    margin: '0 17px 17px 20px !important',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    marginTop: 0,
  },
  infoCardIcon: {
    display: 'flex',
    justifyContent: 'center',
    width: 120,
  },
  cardHeader: {
    marginLeft: '15px !important',
    marginRight: '15px !important',
  },
  cardBody: {
    padding: '0 18px',
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
  },
  cardTitleValue: {
    float: 'right',
    color: '#838383',
    fontSize: 14,
  },
  cancleBtn: {
    marginLeft: '10px',
  },
});

export default styles;