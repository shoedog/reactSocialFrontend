---
```
├── bin     # Unused -> Has: server/server config files saved for reference
├── src                    # Application code + client.js( if client expands, it should get own Directory)
    ├── actions            # redux actions
    ├── components         # 'dumb' components -> stateless
    ├── containers         # 'smart' components -> hold/manage states/actions
    ├── lib                # middlewares, could add constants here
    ├── reducers           # reducers
    ├── server             # rendering server directory
    ├── utils              # utilities: mostly API/async related
```

---
