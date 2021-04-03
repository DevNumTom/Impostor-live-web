import {
  Avatar,
  Button,
  createStyles,
  jssPreset,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Player } from '../models/player';
import { auth, firestore } from '../lib/firebase';
import { UserContext } from '../lib/context';
import { SessionData } from '../models/sessionData';

import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      marginBottom: 20,
    },
  })
);

export default function CreateGame() {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const router = useRouter();
  const [pin, setPin] = useState(null);
  const [players, setPlayer] = useState<Player[]>([]);

  useEffect(() => {
    createGameSession();
  }, []);

  const createGameSession = () => {
    // TODO - make it more unique or check its existance, because than overwrite another game
    const randomPin = Math.ceil(1000 + Math.random() * 9000);
    const gameDoc = firestore.doc(`games/${randomPin}`);
    const sessionData: SessionData = {
      adminUid: user.uid,
      isActive: false,
    };
    gameDoc.set(sessionData).then(() => {
      setPin(randomPin);
      gameDoc.onSnapshot((doc) => {
        const playerArr: Player[] = doc.data().players || [];
        if (playerArr.length !== players.length) {
          setPlayer(playerArr);
        }
      });
    });
  };

  const startGame = () => {
    const gameDoc = firestore.doc(`games/${pin}`);
    gameDoc
      .set({ isActive: true }, { merge: true })
      .then(() => router.push(`/games/${pin}`));
  };

  return (
    <div className='flex-centered-column justify-space-around'>
      <h1>Your PIN: {pin}</h1>
      <p>Joined players:</p>
      <List className={classes.root}>
        {players.map((player) => (
          <ListItem key={player.uid}>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={player.name} />
          </ListItem>
        ))}
      </List>
      <Button variant='contained' color='primary' onClick={() => startGame()}>
        Start game
      </Button>
    </div>
  );
}
