import {
    Chart as ChartM,
    Line as LineM,
    Point as PointM,
    Tooltip as TooltipM,
    Legend as LegendM,
    Interaction as InteractionM,
    Axis as AxisM,
    Interval as IntervalM,
    View as ViewM,
    registerShape as registerShapeM
} from "bizcharts";
import { IChartProps } from "bizcharts/lib/interface";
import { forwardRef } from "react";
import { classNames } from "utils";


export const Line = LineM;
export const Point = PointM;
export const Legend = LegendM;
export const Tooltip = TooltipM;
export const Interaction = InteractionM;
export const Interval = IntervalM;
export const Axis = AxisM
export const registerShape = registerShapeM

export const View = ViewM

export const Chart: React.ForwardRefExoticComponent<Pick<IChartProps, string | number>> = forwardRef(({ data, children, className, ...ref }, refs) => {
    return (
        <ChartM data={data} {...ref} className={classNames("Chart", className)}>
            {children}
        </ChartM>
    );
});
