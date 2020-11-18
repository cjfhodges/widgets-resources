import { createElement, ReactElement } from "react";
import { all } from "deepmerge";

import { BarChartProps } from "../typings/BarChartProps";
import { BarChart as BarChartComponent } from "./components/BarChart";
import { BarChartStyle, defaultBarChartStyle } from "./ui/Styles";
import { useSeries } from "./utils/SeriesLoader";

export function BarChart(props: BarChartProps<BarChartStyle>): ReactElement | null {
    const { name, barSeries, showLegend, style, xAxisLabel, yAxisLabel, presentation } = props;

    const customStyles = style ? style.filter(o => o != null) : [];

    const styles = all<BarChartStyle>([defaultBarChartStyle, ...customStyles]);

    const series = useSeries(barSeries);

    if (!series || (xAxisLabel && xAxisLabel.value === undefined) || (yAxisLabel && yAxisLabel.value === undefined)) {
        return null;
    }

    return (
        <BarChartComponent
            series={series}
            style={styles}
            presentation={presentation}
            showLegend={showLegend}
            xAxisLabel={xAxisLabel?.value}
            yAxisLabel={yAxisLabel?.value}
            warningPrefix={`[${name}]: `}
        />
    );
}