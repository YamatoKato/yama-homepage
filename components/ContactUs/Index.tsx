import React, { useState } from 'react';
import {
  Button,
  Grid,
  Slide,
  Snackbar,
  SnackbarContent,
  TextField,
} from '@mui/material';
import { init, send } from 'emailjs-com';
import ClearIcon from '@mui/icons-material/Clear';

function Transition(props: any) {
  return <Slide {...props} direction='left' />;
}
export const ContactUs: React.FC = () => {
  const user_id: string | undefined =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const service_id: string | undefined =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const template_id: string | undefined =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);

  const sendEmail = () => {
    if (
      user_id !== undefined &&
      service_id !== undefined &&
      template_id !== undefined
    ) {
      init(user_id);
      const template_param = {
        to_name: name,
        email: mail,
        message: message,
        title: title,
      };
      send(service_id, template_id, template_param).then(() => {
        console.log('success to send email');
        setOpen(true);
        setSendLoading(false);
      });
    }
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendLoading(true);
    sendEmail();
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyItems='center'
      >
        <form onSubmit={onSubmit}>
          <TextField
            className='contact-name'
            type='text'
            required
            label='氏名(必須)'
            fullWidth
            margin='normal'
            onChange={onChangeName}
            value={name}
            inputProps={{ disableUnderline: true }}
          />
          <TextField
            className='contact-mail'
            type='email'
            required
            label='メールアドレス(必須)'
            fullWidth
            margin='normal'
            onChange={onChangeMail}
            value={mail}
            inputProps={{ disableUnderline: true }}
          />
          <TextField
            className='contact-title'
            type='text'
            required
            label='件名(必須)'
            fullWidth
            margin='normal'
            onChange={onChangeTitle}
            value={title}
            inputProps={{ disableUnderline: true }}
          />
          <TextField
            className='contact-message'
            type='text'
            required
            label='お問い合わせ内容(必須)'
            fullWidth
            multiline
            rows={4}
            margin='normal'
            onChange={onChangeMessage}
            value={message}
            inputProps={{ disableUnderline: true }}
          />
          <Button
            disabled={sendLoading}
            className=' text-white bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900'
            type='submit'
          >
            Send
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            TransitionComponent={Transition}
            transitionDuration={{
              enter: 800,
              exit: 800,
            }}
            onClose={handleClose}
          >
            <SnackbarContent
              className='bg-gradient-to-r from-stone-900  via-slate-600 to-stone-900'
              message={
                <span className=' text-white' id='message-id'>
                  送信が完了しました
                </span>
              }
              action={<ClearIcon onClick={handleClose} />}
            />
          </Snackbar>
        </form>
      </Grid>
    </div>
  );
};
