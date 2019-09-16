import * as React from 'react'
import Link from 'next/link'

import { UserSample, } from '../interfaces'

type Props = {
  data: UserSample,
}

const ListItem: React.FunctionComponent<Props> = ({ data, }) => (
  <Link href={`/detail?id=${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
