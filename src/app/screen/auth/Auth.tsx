import { FC } from 'react';
import './Auth.scss';
import { Input } from '../../common/input/Input';
import { Button } from '../../common/button/Button';
import { useForm } from 'react-hook-form';
import { Screen } from '../../common/layouts/screen/Screen';
import { getStatus } from '../../../store/auth/authStoreApi';
import { setInstanceData } from '../../../utils/localStorage';
import { Form } from '../../common/layouts/form/Form';
import { Container } from '../../common/layouts/container/Container';

interface IAuthForm {
  idInstance: string;
  apiTokenInstance: string;
}

export const Auth: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuthForm>();

  const submit = handleSubmit((validated) => {
    setInstanceData(validated.idInstance, validated.apiTokenInstance);
    getStatus();
  });

  return (
    <Screen
      className="single--auth"
      title={'Введите свои учетные данные из системы GREEN-API'}
    >
      <Container>
        <Form className={'auth__form'} onSubmit={submit}>
          <Input
            placeholder={'IdInstance'}
            {...register('idInstance', { required: true })}
            error={errors.idInstance}
          />
          <Input
            placeholder={'ApiTokenInstance'}
            {...register('apiTokenInstance', { required: true })}
            error={errors.apiTokenInstance}
          />
          <Button className={'auth__button'}>Продолжить</Button>
        </Form>
      </Container>
    </Screen>
  );
};
