import {AxiosError, AxiosResponse} from 'axios';
import useAxios from '../../common/hooks/useAxios';
import config from '../../common/config';
import services from '../../common/constants/configConst';
import {RequestHrmModel} from '../models/requestModel';

export interface IUseSspApi {
  sendCandidateInfo: (
    data: RequestHrmModel,
    onSuccess: (response: AxiosResponse) => void,
    onReject: (response: AxiosError) => void,
    onFinally: () => void
  ) => void;
}

/**
 * Хук для работы с endpoint`s SSP
 */
const useSspApi = (): IUseSspApi => {
  const {postRequest} = useAxios();

  const sendCandidateInfo = (
    body: RequestHrmModel,
    onSuccess: (response: AxiosResponse) => void,
    onReject: (response: AxiosError) => void,
    onFinally: () => void
  ) =>
    postRequest<any>({
      url: `${config.services[services.sspHost]}`,
      configuration: {
        headers: {
          Origin: config.services[services.sspHost],
        },
      },
      body,
      onSuccess,
      onReject,
      onFinally,
    });

  return {sendCandidateInfo};
};

export default useSspApi;
