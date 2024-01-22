import React from 'react'
import { Breadcrumb, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useAppSelector } from 'src/hooks/reduxStore'
import styles from './index.module.less'
import { BreadCrumbType } from 'src/store/common'
import classNames from 'classnames'

type CusBreadcrumbPropsType = {
  breadCrumbs?: BreadCrumbType
}

const CusBreadcrumb = (props: CusBreadcrumbPropsType) => {
  const history = useHistory()

  const { breadCrumbs: storeBreadCrumbs } = useAppSelector((state) => ({
    breadCrumbs: state.common.breadCrumbs,
  }))

  const { breadCrumbs: propsBreadCrumbs } = props

  const { prev, hideBackBtn = false, paths } = propsBreadCrumbs || storeBreadCrumbs || ({} as BreadCrumbType)

  const handleBack = () => {
    history.push(prev)
  }

  return (
    <div className={classNames(['flex w-full h-12 items-center', styles.breadcrumbWrapper])}>
      {!hideBackBtn && prev ? (
        <Button className={classNames(['text-sm mr-4 w-12 align-middle pl-0 pr-0'])} type="link" onClick={handleBack}>
          <LeftOutlined className={classNames(['align-middle inline-block'])} />
          <span className={classNames(['align-middle inline-block'])}>返回</span>
        </Button>
      ) : null}
      <span className={classNames(['w-0.5 h-3.5 mr-2 leading-5 relative top-px', styles.icon])}></span>
      <div className="flex-1">
        <Breadcrumb separator=">">
          {paths?.map((item, index, arr) => {
            const { name, path } = item
            return name ? (
              <Breadcrumb.Item key={name}>
                {index !== arr.length - 1 && path ? (
                  <a className="text-overflow" onClick={() => history.push(path!)} title={name}>
                    {name}
                  </a>
                ) : (
                  <span className="text-overflow" title={name}>
                    {name}
                  </span>
                )}
              </Breadcrumb.Item>
            ) : null
          })}
        </Breadcrumb>
      </div>
    </div>
  )
}

export default CusBreadcrumb
