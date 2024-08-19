import React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GameDetailsProps } from '../types/components';

const GameCard = ({ game }: GameDetailsProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%',
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        backgroundColor: '#e9f1fb',
        height: '100%',
        borderRadius: '25px',
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon className="text-darkPurple" />
          </IconButton>
        }
        title={
          <span className="text-left text-xl text-darkPurple lg:text-2xl">
            {game?.name}
          </span>
        }
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '150px',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '10px',
        }}
        subheader={
          <span className="text-darkPurple">{`Release date: ${new Date(
            game?.released
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}</span>
        }
      />
      <CardMedia
        component="img"
        height={194}
        image={game?.background_image}
        alt={game?.name}
        sx={{ height: '194px' }}
      />
      <CardActions
        disableSpacing
        className="mx-4 md:mx-0 flex flex-row items-center justify-between"
      >
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon className="text-darkPurple" />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon className="text-darkPurple" />
          </IconButton>
        </div>
        <div className="cursor-pointer self-center hover:font-bold hover:text-primaryPurple">
          <Link href={`/games/${game?.id}`} aria-label={'Game details'}>
            Learn more
          </Link>
        </div>
        {/* <ExpandMore
          expand={isOpen}
          onClick={handleExpandClick}
          aria-expanded={isOpen}
          aria-label="show more"
        >
          <ExpandMoreIcon className="text-darkPurple" />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div color="colors-light">
            <p className="font-bold">Genres:</p>
            {game?.genres?.map((genre) => genre.name).join(', ') ||
              'No information'}
          </div>
          <div color="colors-light">
            <p className="font-bold">Platform:</p>
            {game?.parent_platforms
              ?.map((detail) => detail.platform.name)
              .join(', ') || 'No information'}
          </div>
          <div color="colors-light">
            <p className="font-bold">Metascore:</p>
            {game?.metacritic || 'No information'}
          </div>
          <div color="colors-light">
            <p className="font-bold">Available on:</p>
            {game?.stores?.map((details) => details.store.name).join(', ') ||
              'No information'}
          </div>
          <div color="colors-light">
            <p className="font-bold">Tags:</p>
            {(game?.tags?.length > 0 &&
              game?.tags?.map((tag) => tag.name).join(', ')) ||
              'No information'}
          </div>
        </CardContent>
      </Collapse> */}
    </Card>
  );
};

export default GameCard;
