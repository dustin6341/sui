window.BENCHMARK_DATA = {
  "lastUpdate": 1688051797065,
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
      }
    ]
  }
}