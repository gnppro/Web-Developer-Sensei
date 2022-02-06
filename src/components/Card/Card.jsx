import Button from '../Button/Button';
import "./Card.css";

const openInNewTab = (url) => () => {
  console.log('testing')
  window.open(url, '_blank').focus();
}

export default function Card({ item }) {
  const {
    title,
    dates_of_birth_used,
    place_of_birth,
    hair_raw,
    hair,
    eyes_raw,
    eyes,
    height_max,
    height_min,
    weight,
    sex,
    race_raw,
    race,
    nationality,
    scars_and_marks,
    ncic,
    images,
    aliases,
    reward_text,
    url,
  } = item;

  return (
    <div className="Card">
      <div className="Card-Image">
        {/* {images.map(({ original }) => (
          <img src={original} alt="" />
        ))} */}
        <img
          src={
            images &&
            images.length > 0 &&
            (images[0].original || images[1].original)
          }
          alt=""
        />
      </div>
      <div className="Card-Title">
        <h2>{title}</h2>
        {aliases && aliases.length > 0 && (
          <>
            <h3>Aliases:</h3>
            <p>{aliases.join(" , ")}</p>
          </>
        )}
      </div>
      <div className="Card-Fields">
        {reward_text && <p>{reward_text}</p>}
        {dates_of_birth_used && (
          <p>
            Date(s) of Birth Used: <b>{dates_of_birth_used.join(" / ")}</b>
          </p>
        )}
        {place_of_birth && (
          <p>
            Place of Birth: <b>{place_of_birth}</b>
          </p>
        )}
        {(hair_raw || hair) && (
          <p>
            Hair: <b>{hair_raw || hair}</b>
          </p>
        )}
        {(eyes_raw || eyes) && (
          <p>
            Eyes: <b>{eyes_raw || eyes}</b>
          </p>
        )}
        {(height_max || height_min) && (
          <p>
            Height: <b>{height_max || height_min}</b>
          </p>
        )}
        {weight && (
          <p>
            Weight: <b>{weight}</b>
          </p>
        )}
        {sex && (
          <p>
            Sex: <b>{sex}</b>
          </p>
        )}
        {(race_raw || race) && (
          <p>
            Race: <b>{race_raw || race}</b>
          </p>
        )}
        {nationality && (
          <p>
            Nationality: <b>{nationality}</b>
          </p>
        )}
        {scars_and_marks && (
          <p>
            Scars and Marks: <b>{scars_and_marks}</b>
          </p>
        )}
        {ncic && (
          <p>
            NCIC: <b>{ncic}</b>
          </p>
        )}
      </div>
      <Button onClick={openInNewTab(url)} >View Detail</Button>
    </div>
  );
}
