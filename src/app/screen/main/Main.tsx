import { FC, ReactNode } from 'react';
import './Main.scss';
import { Screen } from '../../common/layouts/screen/Screen';
import { Input } from '../../common/input/Input';
import { Button } from '../../common/button/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { Form } from '../../common/layouts/form/Form';
import { Container } from '../../common/layouts/container/Container';

interface ICreateChatForm {
  phone: string;
}

export const Main: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateChatForm>();
  const navigate = useNavigate();
  const submit = handleSubmit((validated) => {
    const phoneOnlyDigits = validated.phone
      .trim()
      .split(/-|\s|\+|\(|\)/)
      .join('');
    navigate(phoneOnlyDigits);
  });

  return (
    <Screen className="single--main" title={'Перейти к чату по номеру'}>
      <Container>
        <Form onSubmit={submit}>
          <InputMask
            mask="+7 (999) 999-99-99"
            placeholder={'Введите номер телефона'}
            {...register('phone', {
              pattern: {
                value: /\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/,
                message: 'Неверный формат номера телефона',
              },
              required: true,
            })}
          >
            {
              ((inputProps: any) => (
                <Input {...inputProps} type="tel" error={errors.phone} />
              )) as unknown as ReactNode
            }
          </InputMask>
          <Button>Перейти</Button>
        </Form>
      </Container>
    </Screen>
  );
};
