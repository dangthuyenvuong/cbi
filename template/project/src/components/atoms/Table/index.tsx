import React from "react";
import { classNames } from "utils";
import { Skeleton } from "..";


interface ColumnProp<T> {
    title: string;
    index?: keyof T;
    render?: (item: T) => React.ReactNode;
    width?: string;
}

export type ColumnProps<T> = ColumnProp<T>[];
export type TableProp<T> = React.HTMLAttributes<HTMLDivElement> & {
    columns: ColumnProps<T>;
    data: T[];
    loading?: boolean
    loadingCount?: number
    trClick?: (item: T) => void
};

export const Table = <T extends any>(props: TableProp<T>): any => { // eslint-disable-line
    let { data, columns, className, loading, trClick, loadingCount = 10, ...ref } = props;
    if (loading) {
        return [...Array(loadingCount)].map((_, i) => <div key={i} className="m-b-10">
            <Skeleton width="100%" height={52} />
        </div>)
    }

    return (
        <div {...ref} className={classNames("Table", className)}>
            <table>
                <thead className="thead">
                    <tr>
                        {columns.map((e, i) => (
                            <th key={i}>{e.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => (
                        <tr key={i} onClick={() => trClick?.(e)}>
                            {columns.map((e1, i1) => (
                                <td
                                    key={i1}
                                    style={{
                                        width:
                                            e1?.width ||
                                            "auto                                                                                                                                              ",
                                    }}
                                >
                                    {(e1.render && e1.render(e)) || (e1.index && e[e1.index])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
