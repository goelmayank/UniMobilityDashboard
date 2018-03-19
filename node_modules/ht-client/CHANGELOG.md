# 0.1.1
- Add `actionsHeatmapClient`
- Use `dataParam` per entity
- Add `usersHeatmapClient`
- Results to `pageAll` api call adds up.

# 0.1.0-beta
- Fix `rxjs` operator bundling for umd bundle

# 0.0.20-beta
- Stop fetching client data on `setActive(false)`
- Remove `moment` as dependency

# 0.0.19-beta
- Add rollup
- Add action filters

# 0.0.18-beta
- Start fetching data when `active$` is not defined
- Add actions graph, actions list, actions summary client
- Fix `destroy` function entity client
- Use pipe instead of let operator
- Use `DateRangeMap` for `initialDateRange`

# 0.0.17-beta
- Add get loading for `usersClient` using `CombineLoadings` from `ht-data`
- Add `AllowedQueryMaps` and remove `AllowedQueryKeys`
- Clear data of 'listAll' when `show_all` is removed
- Add `getBaseQuery` to entities