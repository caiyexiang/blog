import Vue, { VueConstructor } from 'vue';
import { AxiosInstance } from 'axios';
import { Ajax } from '@/helper/ajax';
import { Api } from '@/helper/api';
import { Validators } from '@/helper/validators';

type Msg = (msg?: string) => void;

declare global {
  interface Window {
    axios: AxiosInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $error: Msg;
    $warnning: Msg;
    $success: Msg;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
    $error: Msg;
    $warnning: Msg;
    $success: Msg;
  }
}
