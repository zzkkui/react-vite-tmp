import React, { Suspense } from 'react'
import { Spin } from 'antd'
import Icon, { AppstoreAddOutlined } from '@ant-design/icons'
import hahaSvg from '~icons/svg/haha.svg'

// vite 会严格检测循环引用（这里 MainLayout 也会引用 routeObj 来生成菜单），所以采用异步引用
// import MainLayout from 'src/layout/mainLayout'
const MainLayout = React.lazy(() => import('src/layout/mainLayout'))
const EmptyLayout = React.lazy(() => import('src/layout/emptyLayout'))
const Overview = React.lazy(() => import('src/pages/overview'))
const Redis = React.lazy(() => import('src/pages/redis'))
const RedisDetail = React.lazy(() => import('src/pages/redis/detail'))
const Setting = React.lazy(() => import('src/pages/setting'))
const Auth = React.lazy(() => import('src/pages/auth'))
// const Auth = await import('src/pages/auth')

export interface CusLayoutMeta {
  hideHeader?: boolean
  hideBreadcrumb?: boolean
  hideMenu?: boolean
  collapsed?: boolean
}

export interface CusRouteMeta {
  // 是否为单级菜单
  // single?: boolean
  title?: string
  // 菜单排序
  // orderNo?: number
  icon?: React.ReactNode
  // isMenu 不传或者传 true，表示为菜单
  isMenu?: boolean
  url?: string
  auth?: string
  layoutMeta?: CusLayoutMeta
}

export type LayoutType =
  | React.LazyExoticComponent<(props: any) => React.JSX.Element>
  | ((props: any) => React.JSX.Element)

export type RouteType = {
  name: string
  path?: string
  notFoundPath?: string
  component?: React.ReactNode
  routes?: RouteType[]
  meta?: CusRouteMeta
  redirect?: string
  layout?: LayoutType
  menuName?: string
}

// console.log(taskSvg)

export const withSuspense = (
  Component: React.LazyExoticComponent<(props: any) => React.JSX.Element> | (() => React.JSX.Element),
) => (
  <Suspense fallback={<Spin style={{ position: 'absolute', left: '50%', top: '25%' }} size="large" />}>
    <Component />
  </Suspense>
)

// 默认模式，使用默认布局
// const routeObj: RouteType[] = [
//   {
//     path: '/overview',
//     name: 'overview',
//     meta: {
//       title: '总览',
//       isMenu: true,
//       icon: <AppstoreAddOutlined />,
//     },
//     component: withSuspense(Overview),
//   },
//   {
//     name: 'database',
//     meta: {
//       title: '数据库',
//       isMenu: true,
//       icon: 'icon-database-cache',
//     },
//     routes: [
//       {
//         path: '/redis',
//         name: 'redis',
//         component: withSuspense(Redis),
//         meta: {
//           title: 'Redis',
//           isMenu: true,
//         },
//         routes: [
//           {
//             path: '/:id',
//             name: 'RedisDetail',
//             component: withSuspense(RedisDetail),
//             meta: {
//               layoutMeta: {
//                 hideHeader: true,
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: 'setting',
//     path: '/setting',
//     component: withSuspense(Setting),
//     meta: {
//       title: '设置',
//       isMenu: true,
//       // icon: <TaskSvg />,
//     },
//   },
// ]

// 布局模式 多种布局，如果没有 layout，则使用默认布局
const routeObj: RouteType[] = [
  {
    // path: '/',
    name: 'MAIN_LAYOUT',
    layout: MainLayout,
    // 多布局根据 menuName 生成菜单
    menuName: 'MAIN',
    // redirect: '/overview',
    notFoundPath: '/*',
    routes: [
      {
        path: '/overview',
        name: 'overview',
        meta: {
          title: '总览',
          isMenu: true,
          icon: <AppstoreAddOutlined />,
        },
        component: withSuspense(Overview),
      },
      {
        name: 'database',
        meta: {
          title: '数据库',
          isMenu: true,
          icon: 'icon-database-cache',
        },
        routes: [
          {
            path: '/redis',
            name: 'redis',
            component: withSuspense(Redis),
            meta: {
              title: 'Redis',
              isMenu: true,
            },
            routes: [
              {
                path: '/:id',
                name: 'RedisDetail',
                component: withSuspense(RedisDetail),
                meta: {
                  layoutMeta: {
                    hideHeader: true,
                    collapsed: true,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        name: 'setting',
        path: '/setting',
        component: withSuspense(Setting),
        meta: {
          title: '设置',
          isMenu: true,
          icon: <Icon component={hahaSvg} />,
        },
      },
    ],
  },
  {
    name: 'EMPTY_LAYOUT',
    layout: EmptyLayout,
    path: '/status/:path?',
    notFoundPath: '/status/*',
    routes: [
      {
        name: 'auth',
        path: '/status/auth',
        component: withSuspense(Auth),
        meta: {
          title: '权限',
        },
      },
    ],
  },
]

export default routeObj
