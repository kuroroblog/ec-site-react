import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: '#4dd0e1',
    color: '#000',
    fontSize: 12,
    height: 48,
    marginButton: 16,
    width: 256,
    [theme.breakpoints.down('sm')]: {
      fontsize: 12,
    },
  },
}))

const PrimaryButton = (props: { onClick: any; label: string }) => {
  const classes = useStyles()
  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton
