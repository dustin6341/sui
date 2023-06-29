window.BENCHMARK_DATA = {
  "lastUpdate": 1688057342902,
  "repoUrl": "https://github.com/MystenLabs/sui",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "93547199+oxade@users.noreply.github.com",
            "name": "oxade",
            "username": "oxade"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "250e9b481984e8d6a56db9c68e106ceb62b8cf23",
          "message": "port profiler to v0 (#12758)\n\n## Description \r\n\r\nPorts the profiler to exec v0 and cleansup some code.\r\nThis allows us to profile historical TXs\r\n\r\n## Test Plan \r\n\r\nManual\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-29T10:06:06-05:00",
          "tree_id": "d46b12ffaf02b1f4201288083ed92386c33d3f7e",
          "url": "https://github.com/MystenLabs/sui/commit/250e9b481984e8d6a56db9c68e106ceb62b8cf23"
        },
        "date": 1688051793120,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 355007,
            "range": "± 14999",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "106119108+gegaowp@users.noreply.github.com",
            "name": "Ge Gao",
            "username": "gegaowp"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "100250e8039687f20eafa3fa745315d89af3c884",
          "message": "indexer fix: fromOrTO address filter fetch limit (#12763)\n\n## Description \r\n- quick fix for FromOrTo address, we need to fetch limit + 1 to check if\r\nwe have next page, I missed that\r\n- the FromOrTo query no longer needs GROUP BY tx_digest after de-duping\r\n(tx_digest, recipient) on the writing path, so I simplify the query a\r\nbit as well.\r\n\r\n## Test Plan \r\n\r\n```\r\ncurl --location --request POST http://127.0.0.1:3030 \\\r\n--header 'Content-Type: application/json' \\\r\n--data-raw '{\r\n    \"jsonrpc\": \"2.0\",\r\n    \"id\": 1,\r\n    \"method\": \"suix_queryTransactionBlocks\",\r\n    \"params\": [\r\n        {\r\n            \"filter\": {\r\n                \"FromOrToAddress\": {\"addr\": \"0xa7536c86055012cb7753fdb08ecb6c8bf1eb735ad75a2e1980309070123d5ef6\"}\r\n            }\r\n        },\r\n        null,\r\n        20,\r\n        false\r\n    ]\r\n}' | jq\r\n```\r\n\r\nrun this query and make sure the cursor and hasNextPage is set properly \r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-29T16:33:38Z",
          "tree_id": "0e95b704a1427946c6d3207ca80c70b33e8ecb92",
          "url": "https://github.com/MystenLabs/sui/commit/100250e8039687f20eafa3fa745315d89af3c884"
        },
        "date": 1688057340646,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 302744,
            "range": "± 26585",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}