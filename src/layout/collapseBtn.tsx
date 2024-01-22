import React, { FC } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './style/collapseBtn.module.less'
import classNames from 'classnames'

interface CollapseBtnProps {
  collapse: boolean
  onChange: (collapse: boolean) => void
}

const CollapseBtn: FC<CollapseBtnProps> = (props: CollapseBtnProps) => {
  const { collapse, onChange } = props

  const handleClick = () => {
    onChange(!collapse)
  }
  return (
    <div
      className={classNames([
        'absolute bottom-0 w-full text-lg h-10 leading-10 text-left pl-5 cursor-pointer',
        styles.btnBox,
      ])}
      onClick={handleClick}
    >
      {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )
}

export default CollapseBtn
