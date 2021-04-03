import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Button,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
} from '@material-ui/core';
import { firestore } from '../lib/firebase';
import { UserContext } from '../lib/context';
import firebase from 'firebase';
import { Player } from '../models/player';
import { useRouter } from 'next/router';

const ReactCodeInput = dynamic(import('react-code-input'));

export default function JoinGame() {
  const [disableButton, setDisableButton] = useState(true);
  const [name, setName] = useState<string>(null);
  const [pin, setPin] = useState<number>(null);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const onPinChanged = (pin: string) => {
    setPin(+pin);
    validateButton();
  };

  const onNameChanged = (name: string) => {
    setName(name);
    validateButton();
  };

  const validateButton = () => {
    if (pin?.toString().length === 4 && name) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  const joinToGameSession = () => {
    const gameDoc = firestore.doc(`games/${pin}`);
    if (gameDoc) {
      gameDoc
        .set(
          {
            players: firebase.firestore.FieldValue.arrayUnion({
              uid: user.uid,
              name,
            } as Player),
          },
          { merge: true }
        )
        .then(() => {
          setShowLoadingSpinner(true);
          gameDoc.onSnapshot((doc) => {
            if (doc.data().isActive) {
              router.push(`/games/${pin}`);
            }
          });
        });
    } else {
      // TODO
      console.warn('Failed');
    }
  };

  return (
    <>
      {showLoadingSpinner ? (
        <div className='flex-centered-column justify-center'>
          <h3>waiting for others to join...</h3>
          <CircularProgress disableShrink />
        </div>
      ) : (
        <JoinGamePanel
          disableButton={disableButton}
          joinToGameSession={joinToGameSession}
          onNameChanged={onNameChanged}
          onPinChanged={onPinChanged}
        />
      )}
    </>
  );
}

type Props = {
  onPinChanged: (value: string) => void;
  onNameChanged: (value: string) => void;
  joinToGameSession: () => void;
  disableButton: boolean;
};

function JoinGamePanel({
  disableButton,
  joinToGameSession,
  onNameChanged,
  onPinChanged,
}: Props) {
  return (
    <div className='flex-centered-column justify-space-around'>
      <h1>Type PIN</h1>
      <ReactCodeInput
        type='number'
        fields={4}
        name='pin'
        inputMode='numeric'
        onChange={(value) => onPinChanged(value)}
      />
      <FormControl>
        <InputLabel htmlFor='name-input'>Name</InputLabel>
        <Input
          onChange={(e) => onNameChanged(e.target.value)}
          id='name-input'
          aria-describedby='your-name'
        />
      </FormControl>
      <br />
      <Button
        disabled={disableButton}
        onClick={() => joinToGameSession()}
        variant='contained'
        color='secondary'
      >
        Start game
      </Button>
    </div>
  );
}
