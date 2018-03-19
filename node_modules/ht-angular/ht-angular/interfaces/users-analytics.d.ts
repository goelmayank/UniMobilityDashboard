import { QueryLabel } from "ht-client";
import { DateRange } from "ht-client";
export interface ISummaryConfig<T> {
    tags?: string[];
    title?: string;
    client?: T;
    dateRangeService?: DateRange;
    queryLabels?: QueryLabel[];
}
