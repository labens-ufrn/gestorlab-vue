// src/plugins/quasar.ts
import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

export default {
  install(app: any) {
    app.use(Quasar, {
      config: {},
    });
  },
};