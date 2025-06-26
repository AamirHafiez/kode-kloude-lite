import { MMKV } from "react-native-mmkv";
import { createLocalStorage } from "./utils";

const appLocalStore = new MMKV();
type LocalStorageSchema = {
    NAME: string;
    ADDRESS: {
      line1: string;
      line2: string;
      city: {
        name: string;
        pin: number;
      };
    };
    HEALTH: {
      success: boolean
    }
};

const AppLocalStorage = createLocalStorage<LocalStorageSchema>({storage: appLocalStore})
export default AppLocalStorage;