import { FunctionComponent, } from 'react'

type Props = {
  id: string,
  name: string,
}

const Item: FunctionComponent<Props> = ({
  // id,
  name,
}) => {
  return (
    <div>{name}</div>
  )
}

export default Item
