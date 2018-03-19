# Todo
- Export mixins (done)
- Check bounds is valid, else set user position in placeline

# 0.1.3
- Extract `extendBounds` as new mixin from `TraceMixin`
- Move `clearAllClusters` to `ClusterMixin` from `TraceMixin`
- Fix `setMap` in leaflet for heatmap

# 0.1.1
- Refactor `MapService` to `GlobalMap`
- Add `leaflet.heat` and `heatmapMixin`
- Add `actionsHeatmapTrace` and `StopsHeatmapTrace`
- Add `actionsClusterTrace`

# 0.1.0-beta
- Fix `rxjs` operator bundling for umd bundle
- Remove replay feature
- Add `time-aware-polyline` as dependency

# 0.0.16-beta
- fix stop icon style
- Add rollup

# 0.0.15-beta
- Use array instead of `Leaflet.point` to fix umd bundle
- Fix umd bundle by adding leaflet and leaflet.markercluster in externals of webpack config
- Create `StyleFunct` interface to pass style info. Removes dependency on both google maps and leaflet
- Add `StyleFunct` to entities

# 0.0.14-beta
- Remove leaflet styles, fix leaflet dependencies

# 0.0.13-beta
- Change google map default style
- Fire reset map on `!page.previous` condition. Resets map when first page is fetched
- Add `clearAllCluster` in trace to clear clusters of all marker to fix memory issue due to clearing each google map cluster removing individual markers. Will be called when new array has 100 or more less items and current item count is greater than 500.
- Remove duplicate clearCluster on 'removeAll' on cluster markers