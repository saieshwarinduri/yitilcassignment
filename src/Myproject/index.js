import { Component } from "react";
import { BiUpArrow, BiDownArrow, BiSearchAlt2 } from "react-icons/bi";
import "./index.css";
import Listitem from "../ListItem/index";

class Myproject extends Component {
  state = {
    totalList: [],
    pagelimt: 10,
    pagenumber: 1,
    numberlist: [],
    serchINput: "",
    buttonOn: true,
    authoAssin: true,
    textbuttonOn: true,
    textAsign: true,
  };

  getThedetails = async () => {
    const url = "https://dev.ylytic.com/ylytic/test";
    const response = await fetch(url);
    if (response.ok === true) {
      const data = await response.json();
      let a = 0;
      const newList = [];

      for (let i = 0; i < data.comments.length; i++) {
        const d = new Date(data.comments[i].at);
        const day = d.getDate();
        const mon = d.getMonth();
        const year = d.getFullYear();
        const k = {
          id: a,
          at: `${day}/${mon}/${year}`,
          author: data.comments[i].author,
          like: data.comments[i].like,
          reply: data.comments[i].reply,
          text: data.comments[i].text,
        };
        a += 1;
        newList.push(k);
      }
      this.setState({
        totalList: newList,
        mainList: newList,
      });
    }
  };

  searchinput = (event) => {
    this.setState({
      serchINput: event.target.value,
    });
  };
  componentDidMount() {
    this.getThedetails();
  }

  setThePagealimit = (event) => {
    this.setState({
      pagelimt: event.target.value,
    });
  };

  getTheNumberofButton = (event) => {
    const { totalList } = this.state;

    this.setState({
      pagenumber: event.target.value,
      totalList: totalList,
    });
  };

  setauthorassinding = () => {
    this.setState((p) => ({
      authoAssin: !p.authoAssin,
    }));
  };

  setOrderofText = () => {
    this.setState((p) => ({
      textAsign: !p.textAsign,
    }));
  };

  onpressbutton = () => {
    this.setState({
      buttonOn: false,
      textbuttonOn: true,
    });
  };

  textbuttonon = () => {
    this.setState({
      buttonOn: true,
      textbuttonOn: false,
    });
  };

  render() {
    const {
      totalList,
      pagelimt,
      pagenumber,
      serchINput,
      authoAssin,
      buttonOn,
      textbuttonOn,
      textAsign,
    } = this.state;
    const mainList = totalList.slice(
      pagelimt * pagenumber - pagelimt,
      pagelimt * pagenumber
    );
    const anoterList = mainList.filter(
      (each) =>
        each.author.toLowerCase().includes(serchINput) ||
        each.text.toLowerCase().includes(serchINput)
    );

    const setTheorderofText = () => {
      anoterList.sort((a, b) =>
        a.author.toLowerCase() < b.author.toLowerCase() ? 1 : -1
      );
    };

    const setTheorderofText1 = () => {
      anoterList.sort((a, b) =>
        a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1
      );
    };

    const setTheorderofTextxxxx1 = () => {
      anoterList.sort((a, b) =>
        a.text.toLowerCase() > b.text.toLowerCase() ? 1 : -1
      );
    };
    const setTheorderofTextxxxx = () => {
      anoterList.sort((a, b) =>
        a.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1
      );
    };

    const callauother = () => {
      authoAssin ? setTheorderofText() : setTheorderofText1();
    };
    const callTextasign = () => {
      textAsign ? setTheorderofTextxxxx() : setTheorderofTextxxxx1();
    };

    buttonOn && callauother();
    textbuttonOn && callTextasign();

    const numberlist = [];
    for (let i = 1; i <= Math.ceil(totalList.length / pagelimt); i++) {
      numberlist.push(i);
    }

    return (
      <div className="Maincontainer">
        <div className="contentcontaienr">
          <h1>Comments</h1>
          <div className="container searchselectoption">
            <div className="searchcontainer">
              <input onChange={this.searchinput} type="search" />
              <button>
                <BiSearchAlt2 />
              </button>
            </div>
            <div>
              <select
                className="selectcontainer"
                onChange={this.setThePagealimit}
              >
                <option value="10" defaultValue>
                  10 Lines
                </option>
                <option value="20">20 Lines</option>
                <option value="30">30 Lines</option>
                <option value="50">50 Lines</option>
              </select>
            </div>
          </div>
          <div className="container paginationcontainer">
            <button
              className="buttonpagination"
              value={numberlist[0]}
              onClick={this.getTheNumberofButton}
              type="button"
            >
              First
            </button>
            {numberlist.map((each) => (
              <button
                className={
                  each === pagenumber
                    ? "buttonpagination btncolor  btn1"
                    : "buttonpagination  btn1"
                }
                value={each}
                type="button"
                onClick={this.getTheNumberofButton}
                key={each}
              >
                {each}
              </button>
            ))}
            <button
              className="buttonpagination"
              value={numberlist[numberlist.length - 1]}
              onClick={this.getTheNumberofButton}
              type="button"
            >
              Last
            </button>
          </div>
          <div className="container headingAndDetails">
            <ul className="namesContainer">
              <li className="headingAt">
                <div className="nameButtoncontainer">
                  <h5 className="heading">at</h5>
                  <div className="buttoncontainer">
                    <button className="button">
                      <BiUpArrow className="arrowsymble" />
                    </button>
                    <button className="button">
                      <BiDownArrow className="arrowsymble" />
                    </button>
                  </div>
                </div>
              </li>
              <li className="headingAuthor">
                <div className="nameButtoncontainer">
                  <h5 className="heading">author</h5>
                  <div className="buttoncontainer">
                    {buttonOn ? (
                      <button className="button" onClick={this.onpressbutton}>
                        <BiUpArrow className="arrowsymble" />
                        <BiDownArrow className="arrowsymble" />
                      </button>
                    ) : (
                      <button
                        className="button"
                        onClick={this.setauthorassinding}
                      >
                        {authoAssin ? (
                          <BiUpArrow className="arrowsymble" />
                        ) : (
                          <BiDownArrow className="arrowsymble" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </li>
              <li className="headingLike">
                <div className="nameButtoncontainer">
                  <h5 className="heading">like</h5>
                  <div className="buttoncontainer">
                    <button className="button">
                      <BiUpArrow className="arrowsymble" />
                    </button>
                    <button className="button">
                      <BiDownArrow className="arrowsymble" />
                    </button>
                  </div>
                </div>
              </li>
              <li className="headingReplay">
                <div className="nameButtoncontainer">
                  <h5 className="heading">reply</h5>
                  <div className="buttoncontainer">
                    <button className="button">
                      <BiUpArrow className="arrowsymble" />
                    </button>
                    <button className="button">
                      <BiDownArrow className="arrowsymble" />
                    </button>
                  </div>
                </div>
              </li>
              <li className="headingText">
                <div className="nameButtoncontainer">
                  <h5 className="heading">text</h5>
                  <div className="buttoncontainer">
                    {textbuttonOn ? (
                      <button className="button" onClick={this.textbuttonon}>
                        <BiUpArrow className="arrowsymble" />
                        <BiDownArrow className="arrowsymble" />
                      </button>
                    ) : (
                      <button className="button" onClick={this.setOrderofText}>
                        {textAsign ? (
                          <BiDownArrow className="arrowsymble" />
                        ) : (
                          <BiUpArrow className="arrowsymble" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            </ul>
            <hr className="line" />
            <ul className="container listofelemen">
              {anoterList.map((each) => (
                <Listitem key={each.id} each={each} />
              ))}
            </ul>
          </div>
          <div className="container paginationcontainer2">
            <button className="buttonpagination">First</button>
            {numberlist.map((each) => (
              <button
                className={
                  each === pagenumber
                    ? "buttonpagination btncolor  btn1"
                    : "buttonpagination  btn1"
                }
                value={each}
                type="button"
                onClick={this.getTheNumberofButton}
                key={each}
              >
                {each}
              </button>
            ))}
            <button className="buttonpagination">Last</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Myproject;
