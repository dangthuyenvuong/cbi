import React from "react"
import Flickity from "react-flickity-component"
import { classNames } from "utils"
export type ListViewProp<T> = React.HTMLAttributes<HTMLDivElement> & {
    items?: T[],
    render: (item: T, i: number, isLoading: boolean) => React.ReactNode,
    LoadingComponent?: React.FC
    scrollAble?: boolean
    direction?: 'horizontal' | 'vertical',
    loadingCount?: number
    isLoading?: boolean
}

export const ListView = <T extends any>(props: ListViewProp<T> & { children?: React.ReactNode }) => { // eslint-disable-line
    const { items, render, isLoading, loadingCount, scrollAble = false, children, LoadingComponent, ...ref } = props

    if (scrollAble) {
        return <Flickity
            options={{
                pageDots: false,
                cellAlign:  'right',
                groupCells: 4,
                arrowShape: {
                    x0: 10,
                    x1: 60, y1: 50,
                    x2: 65, y2: 45,
                    x3: 20
                }
                // initialIndex: 3,
                // wrapAround: true
            }}
        >
            {items?.map((e: T, i) => render(e, i, false))}
        </Flickity>
    }

    return (
        <div {...ref} className={classNames('ListView', ref.className)}>
            {
                isLoading && LoadingComponent ?
                    [...Array(loadingCount || 1)].map((_, i) => <LoadingComponent key={i} />) :
                    items?.map((e: T, i) => render(e, i, !!isLoading))
            }
            {children}
        </div>
    )
}
