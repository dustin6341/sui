window.BENCHMARK_DATA = {
  "lastUpdate": 1688141600430,
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
      },
      {
        "commit": {
          "author": {
            "email": "tmn@mystenlabs.com",
            "name": "Todd Nowacki",
            "username": "tnowacki"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "c29e62377674fcd8f939411cc1975d35a8012929",
          "message": "[move] Remove dead code from MVCC support (#12765)\n\n## Description \r\n\r\n- The effective owner map was used in an early version of the previous\r\nPR (#12055) and was not properly removed\r\n\r\n## Test Plan \r\n\r\n- Ran existing tests\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-29T17:16:09Z",
          "tree_id": "20acab4e673f6f67fbc52c63006141fb616963c1",
          "url": "https://github.com/MystenLabs/sui/commit/c29e62377674fcd8f939411cc1975d35a8012929"
        },
        "date": 1688059510105,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 267233,
            "range": "± 17039",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ashok@mystenlabs.com",
            "name": "Ashok Menon",
            "username": "amnn"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "ccde381c981723b32df8e5cb895fc04d7cfd2a5d",
          "message": "[sui-execution] README (#12767)\n\n## Description \r\n\r\nInternal documentation for working with `sui-execution`\r\n\r\n## Test Plan \r\n\r\n:eyes:",
          "timestamp": "2023-06-29T18:48:47Z",
          "tree_id": "cf54a5ef5a4819821a8f77d91c2da77609270125",
          "url": "https://github.com/MystenLabs/sui/commit/ccde381c981723b32df8e5cb895fc04d7cfd2a5d"
        },
        "date": 1688065121250,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 301327,
            "range": "± 20804",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "lxfind@gmail.com",
            "name": "Xun Li",
            "username": "lxfind"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "cc5d84ca30975618862ad7ff7e674daaec8d80b4",
          "message": "Add checkpoint printing to db-tool (#12768)\n\n## Description \r\n\r\nAdds two commands, PrintCheckpoint and PrintCheckpointContent. Both are\r\nby digest.\r\n\r\n## Test Plan \r\n\r\nTested on local db.\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-29T18:49:50Z",
          "tree_id": "e0c35dc4a373300ed6afed57cf72eee27e78de58",
          "url": "https://github.com/MystenLabs/sui/commit/cc5d84ca30975618862ad7ff7e674daaec8d80b4"
        },
        "date": 1688065167915,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 291624,
            "range": "± 26618",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "8418040+longbowlu@users.noreply.github.com",
            "name": "Lu Zhang",
            "username": "longbowlu"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "5e9f52dcb4bd400cbf99bb307e853b62b958d8cb",
          "message": "remove lengthy logs in authority aggregator for past investigations (#12761)\n\n## Description \r\n\r\nas title\r\n\r\n## Test Plan \r\n\r\nHow did you test the new or updated feature?\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes\r\nremove lengthy logs in authority aggregator for past investigations",
          "timestamp": "2023-06-29T21:25:46Z",
          "tree_id": "0ec24d5f88d0653f8e4f9283fe7f6c605e9227a9",
          "url": "https://github.com/MystenLabs/sui/commit/5e9f52dcb4bd400cbf99bb307e853b62b958d8cb"
        },
        "date": 1688074564407,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 262122,
            "range": "± 9757",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "106645797+sadhansood@users.noreply.github.com",
            "name": "Sadhan Sood",
            "username": "sadhansood"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "1f35bc00127749e551a4760ae69320314c1ae776",
          "message": "Improve db checkpoint handling (#12773)\n\n## Description \r\n\r\nThe current workflow of uploading db checkpoint only uploads in sequence\r\ni.e. it would wait forever if there could be gaps in epoch snapshot on\r\nthe remote storage. This is not a requirement and more often, we really\r\nwant to upload latest epochs and don't care if older epoch snapshots are\r\nthere or not.\r\nThis PR now makes it such that if there is a db checkpoint which is\r\npresent local but not on remote, it will upload it. Besides, it also\r\nimproves how garbage collection runs by making it not dependent on\r\nupload.\r\n\r\n## Test Plan \r\n\r\nAdded uni tests",
          "timestamp": "2023-06-29T14:32:58-07:00",
          "tree_id": "0347103d898e7b6ad6b87d3267e80a11dd874780",
          "url": "https://github.com/MystenLabs/sui/commit/1f35bc00127749e551a4760ae69320314c1ae776"
        },
        "date": 1688074827030,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 308702,
            "range": "± 7857",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "rvantonder@gmail.com",
            "name": "Rijnard van Tonder",
            "username": "rvantonder"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a537c1ebf17a0e7802488c003083a318586de531",
          "message": "move: source service requires repo branch (#12667)\n\n## Description \r\n\r\nIntroduce a `branch` field in `config` when cloning repositories. If we\r\nrun the server on our code today, it won't verify source successfully\r\n(mismatch of `v1.5` framework packages `deepbook` and `sui-framework`\r\ndue to changes). We'll need this in general for other repositories.\r\n\r\n## Test Plan \r\n\r\nAdded test",
          "timestamp": "2023-06-29T15:41:18-07:00",
          "tree_id": "123fe0e14c8351b4c3de2a98899903902db1de42",
          "url": "https://github.com/MystenLabs/sui/commit/a537c1ebf17a0e7802488c003083a318586de531"
        },
        "date": 1688078930414,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 263553,
            "range": "± 27669",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "ashok@mystenlabs.com",
            "name": "Ashok Menon",
            "username": "amnn"
          },
          "committer": {
            "email": "amenon94@gmail.com",
            "name": "Ashok Menon",
            "username": "amnn"
          },
          "distinct": true,
          "id": "a1bac02e861d61c720115822a15e70a112cf21fc",
          "message": "[sui-execution/v1] Hard code pack digest hash modules\n\nWe can't get rid of the alternate implementation of digest calculation\nuntil we drop support for protocol version 16 and below, but this is\none of the steps towards that.\n\nTest Plan:\n\nExisting tests",
          "timestamp": "2023-06-29T16:47:29-07:00",
          "tree_id": "a8d07261fd7754bca97a9afb95bf59484f466651",
          "url": "https://github.com/MystenLabs/sui/commit/a1bac02e861d61c720115822a15e70a112cf21fc"
        },
        "date": 1688083169257,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 395795,
            "range": "± 68901",
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
          "id": "4e684ec359dcfc02a504765a3d35445591450773",
          "message": "indexer: de-dup fromOrToAddress digests (#12788)\n\n## Description \r\n\r\nDuplicate digests would happen when tx sender also has their own as\r\nrecipients.\r\n\r\n## Test Plan \r\n\r\ntesting on address\r\n`0x0000000000000000000000000000000000000000000000000000000000000000`\r\n\r\n```\r\ncurl --location --request POST http://127.0.0.1:3030 \\\r\n--header 'Content-Type: application/json' \\\r\n--data-raw '{\r\n    \"jsonrpc\": \"2.0\",\r\n    \"id\": 1,\r\n    \"method\": \"suix_queryTransactionBlocks\",\r\n    \"params\": [\r\n        {\r\n            \"filter\": {\r\n                \"FromOrToAddress\": {\"addr\": \"0x0000000000000000000000000000000000000000000000000000000000000000\"}\r\n            }\r\n        },\r\n        null,\r\n        5,\r\n        false\r\n    ]\r\n}' | jq\r\n  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current\r\n                                 Dload  Upload   Total   Spent    Left  Speed\r\n100   984  100   667  100   317   1978    940 --:--:-- --:--:-- --:--:--  2972\r\n{\r\n  \"jsonrpc\": \"2.0\",\r\n  \"result\": {\r\n    \"data\": [\r\n      {\r\n        \"digest\": \"7CuBm1AnLgkBMB6GiEn5d3RizznF5LbawjJTs8A5dcXF\",\r\n        \"timestampMs\": \"1681318800000\",\r\n        \"checkpoint\": \"0\"\r\n      },\r\n      {\r\n        \"digest\": \"HneKYTSK8BKSxRftX3HEJrnLADzHVBQdHU7coCxaUw1T\",\r\n        \"timestampMs\": \"1681491604701\",\r\n        \"checkpoint\": \"85168\"\r\n      },\r\n      {\r\n        \"digest\": \"815xhvL4Xdan73ia922Ns58dhta7U1JaJbYvF8M1yJiJ\",\r\n        \"timestampMs\": \"1681578008541\",\r\n        \"checkpoint\": \"161191\"\r\n      },\r\n      {\r\n        \"digest\": \"3gKz11LNEX6B2bTubKqPeERADzA4BEw6DaQ4WrNoiv5e\",\r\n        \"timestampMs\": \"1681664411498\",\r\n        \"checkpoint\": \"237073\"\r\n      },\r\n      {\r\n        \"digest\": \"2Rom2LhVuUaiatCKUEKAJQwesM7PN95hLB5uYB7NW27y\",\r\n        \"timestampMs\": \"1681923621472\",\r\n        \"checkpoint\": \"467715\"\r\n      }\r\n    ],\r\n    \"nextCursor\": \"2Rom2LhVuUaiatCKUEKAJQwesM7PN95hLB5uYB7NW27y\",\r\n    \"hasNextPage\": true\r\n  },\r\n  \"id\": 1\r\n}\r\n```\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-29T21:39:02-04:00",
          "tree_id": "310868a11c9991eedfc37a2500b7da4009b9c643",
          "url": "https://github.com/MystenLabs/sui/commit/4e684ec359dcfc02a504765a3d35445591450773"
        },
        "date": 1688089726276,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 304931,
            "range": "± 6531",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "81660174+mwtian@users.noreply.github.com",
            "name": "mwtian",
            "username": "mwtian"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "bdd29d7f8e70d6632d7881dbe3e5c86cb455e507",
          "message": "Adjust a few logs (#12786)\n\n## Description \r\n\r\n- Avoid logging for every certificate broadcast in authority aggregator,\r\nto reduce noise.\r\n- Add more logging to help debug checkpoint and consensus issues.\r\n\r\n## Test Plan \r\n\r\nCI\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-29T21:30:14-07:00",
          "tree_id": "1e59134b6484bf53de76da5e21069b00bc2270f8",
          "url": "https://github.com/MystenLabs/sui/commit/bdd29d7f8e70d6632d7881dbe3e5c86cb455e507"
        },
        "date": 1688099835303,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 310717,
            "range": "± 25096",
            "unit": "ns/iter"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "zl9394@gmail.com",
            "name": "longbowlu",
            "username": "longbowlu"
          },
          "committer": {
            "email": "bwilliams.eng@gmail.com",
            "name": "Brandon Williams",
            "username": "bmwill"
          },
          "distinct": true,
          "id": "207be158228e113f47b766cb0a5db5cdf6a730aa",
          "message": "use live object iter",
          "timestamp": "2023-06-30T08:40:49-05:00",
          "tree_id": "ef233b56c764ca91238819b20aaabd941dfff7d4",
          "url": "https://github.com/MystenLabs/sui/commit/207be158228e113f47b766cb0a5db5cdf6a730aa"
        },
        "date": 1688133094713,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 306841,
            "range": "± 6936",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "6d3e9b9b1bf19cd33ab608233e8a527372d7b6c9",
          "message": "[easy] improve comments (#12798)",
          "timestamp": "2023-06-30T15:19:57Z",
          "tree_id": "ab9e3b89e00cf3cc49a4454ae31a7e00c9e2fb30",
          "url": "https://github.com/MystenLabs/sui/commit/6d3e9b9b1bf19cd33ab608233e8a527372d7b6c9"
        },
        "date": 1688139001161,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 308382,
            "range": "± 20817",
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
          "id": "940bfb18fd37c849d3558b45a35d4a841fdb5d30",
          "message": "indexer easy: re-enable object history population (#12799)\n\n## Description \r\n\r\ntitle\r\n\r\n## Test Plan \r\n\r\nlocal run and make sure object history will be populated.\r\n\r\nTODO:\r\n- will set up testing DB on mainnet & testnet to see the storage\r\nconsumption\r\n\r\n---\r\nIf your changes are not user-facing and not a breaking change, you can\r\nskip the following section. Otherwise, please indicate what changed, and\r\nthen add to the Release Notes section as highlighted during the release\r\nprocess.\r\n\r\n### Type of Change (Check all that apply)\r\n\r\n- [ ] protocol change\r\n- [ ] user-visible impact\r\n- [ ] breaking change for a client SDKs\r\n- [ ] breaking change for FNs (FN binary must upgrade)\r\n- [ ] breaking change for validators or node operators (must upgrade\r\nbinaries)\r\n- [ ] breaking change for on-chain data layout\r\n- [ ] necessitate either a data wipe or data migration\r\n\r\n### Release notes",
          "timestamp": "2023-06-30T16:05:37Z",
          "tree_id": "41e961a13071d5800a36a968c3c692eb158ae900",
          "url": "https://github.com/MystenLabs/sui/commit/940bfb18fd37c849d3558b45a35d4a841fdb5d30"
        },
        "date": 1688141598167,
        "tool": "cargo",
        "benches": [
          {
            "name": "get_checkpoint",
            "value": 306264,
            "range": "± 5311",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}