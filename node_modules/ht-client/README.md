# Ht Client

### Installation

`npm i ht-js-client`

Peer dependencies that are needed
```
npm i ht-js-utils
npm i underscore
npm i moment-mini
```

### Usage

```
import { HtClient } from "ht-js-client";

const htClient = new HtClient(<SECRET_KEY>)

htClient.action.index({page_size: 10}) //actions list
htClient.action.get(id: string) // action with id
htClient.actions.overview(query: object) //actions overview
```

