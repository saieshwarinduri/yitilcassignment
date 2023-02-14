import "./index.css";

const Listitem = (props) => {
  const { each } = props;
  return (
    <>
      <li className="namesContainer">
        <p className="text headingAt">{each.at}</p>
        <p className="text headingAuthor">{each.author}</p>
        <p className="text headingLike">{each.like}</p>
        <p className="text headingReplay">{each.reply}</p>
        <p className="text headingText">{each.text}</p>
      </li>
      <hr className="linee" />
    </>
  );
};

export default Listitem;
