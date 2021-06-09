import {AxiosError, AxiosResponse} from 'axios';
import {RequestHrmModel} from '../models/requestModel';
import useSspApi from '../api/useSspApi';

export interface IUseSspApi {
  onSendCandidateInfo: (
    data: RequestHrmModel,
    onSuccess: (response: AxiosResponse) => void,
    onReject: (response: AxiosError) => void,
    onFinally: () => void
  ) => void;
}

/**
 * Хук для работы с endpoint`s SSP
 */
const useSspRest = (): IUseSspApi => {
  const {sendCandidateInfo} = useSspApi();

  const onSendCandidateInfo = (
    data: RequestHrmModel,
    onSuccess: (response: AxiosResponse) => void,
    onReject: (response: AxiosError) => void,
    onFinally: () => void
  ) => sendCandidateInfo(data, onSuccess, onReject, onFinally);

  return {onSendCandidateInfo};
};

export default useSspRest;
