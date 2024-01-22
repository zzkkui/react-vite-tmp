import React from 'react'
import { Layout } from 'antd'
import CusBreadCrumb from 'src/components/breadCrumb'
import { CusRouteMeta } from 'src/route/routeConfig'
import { useAppSelector } from 'src/hooks/reduxStore'
import styles from './index.module.less'
import classNames from 'classnames'

const { Header } = Layout

interface RightHeaderProps {
  info?: CusRouteMeta
}
const RightHeader = (props: RightHeaderProps) => {
  const { hideBreadcrumb, hideHeader } = useAppSelector((state) => ({
    hideBreadcrumb: state.common.layoutMate.hideBreadcrumb,
    hideHeader: state.common.layoutMate.hideHeader,
  }))
  const { info = {} as CusRouteMeta } = props

  const { title } = info

  return (
    <Header style={{ display: hideHeader ? 'none' : 'block' }}>
      <div className={classNames(['flex items-center h-12 border-b-x border-solid', styles.headerBox])}>
        {hideBreadcrumb ? (
          <>
            <span className={classNames(['w-0.5 h-3 mr-2', styles.titleIcon])}></span>
            <span className={classNames(['h-4 leading-4 font-semibold'])}>{title}</span>
          </>
        ) : (
          <CusBreadCrumb />
        )}
      </div>
    </Header>
  )
}

export default React.memo(RightHeader)
