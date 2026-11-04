// components/layout/header-wrapper.tsx
import { Suspense } from 'react'
import Header from '~/components/layout/header'
import HeaderSkeleton from '~/components/skeletons/header'
import type { AlbumDataProps } from '~/types/props'

// 服务端组件：把 Header 包在 Suspense 里，骨架屏在解析期间顶上。
// props 由调用方（app/(default)/layout.tsx 一侧）传入 —— 这里不再自己
// 调用数据层，因为原先引用的 ~/server/api/header#fetchHeaderData 在仓库里不存在。
export default async function HeaderWrapper(props: Readonly<AlbumDataProps>) {
    return (
        <Suspense fallback={<HeaderSkeleton />}>
            {/* 客户端组件 */}
            <Header {...props} />
        </Suspense>
    )
}