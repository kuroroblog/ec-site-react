import { TableContainer } from '@material-ui/core'
import { useCallback, useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/styles'
import { TextInput } from '../UIKit'

const useStyles = makeStyles({
  checkIcon: {
    float: 'right',
  },
  iconCell: {
    height: 48,
    width: 48,
  },
})

const SetSizeArea = (props: { sizes: Array<{ size: string; quantity: number }>; setSizes: any }) => {
  const classes = useStyles()

  const [idx, setIdx] = useState(0),
    [size, setSize] = useState(''),
    [quantity, setQuantity] = useState(0)

  const inputSize = useCallback(
    (event) => {
      setSize(event.target.value)
    },
    [setSize]
  )

  const inputQuantity = useCallback(
    (event) => {
      setQuantity(event.target.value)
    },
    [setQuantity]
  )

  const addSize = (idx: number, size: string, quantity: number) => {
    if (size === '' || quantity <= 0) {
      return false
    }

    if (idx === props.sizes.length) {
      props.setSizes((prevState: Array<{ size: string; quantity: number }>) => [
        ...prevState,
        { size: size, quantity: quantity },
      ])

      setIdx(idx + 1)
    } else {
      const newSizes = props.sizes
      newSizes[idx] = { size: size, quantity: quantity }
      props.setSizes(newSizes)

      setIdx(newSizes.length)
    }

    setSize('')
    setQuantity(0)
  }

  const editSize = (idx: number, size: string, quantity: number) => {
    setIdx(idx)
    setSize(size)
    setQuantity(quantity)
  }

  const deleteSize = (deleteIdx: number) => {
    const newSizes = props.sizes.filter(
      (
        item: {
          size: string
          quantity: number
        },
        i: number
      ) => i !== deleteIdx
    )
    props.setSizes(newSizes)
  }

  useEffect(() => {
    setIdx(props.sizes.length)
  }, [props.sizes.length])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 &&
              props.sizes.map((item: { size: string; quantity: number }, idx: number) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => editSize(idx, item.size, item.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => deleteSize(idx)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="center">
          <TextInput
            fullWidth={false}
            label={'サイズ'}
            multiline={false}
            required={true}
            onChange={inputSize}
            rows={1}
            value={size}
            type={'text'}
          />
          <TextInput
            fullWidth={false}
            label={'数量'}
            multiline={false}
            required={true}
            onChange={inputQuantity}
            rows={1}
            value={quantity}
            type={'number'}
          />
        </div>
        <IconButton className={classes.checkIcon} onClick={() => addSize(idx, size, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  )
}

export default SetSizeArea
