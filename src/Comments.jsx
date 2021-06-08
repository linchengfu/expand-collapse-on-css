import React, {useState, useEffect } from "react";

const Widget = () => {
  const [list, setList] = useState();
  useEffect(() => {
    fetch('https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/comments', {
      method: 'GET',
      mode: 'cors',
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        setList(json.data);
        return json;
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  return (
    <div className='background'>
      { list &&
        list.map(item => {
          const date = new Date(item.create_time);
          const h = date.getHours();  // 获取小时数(0-23)
          const m = date.getMinutes();  // 获取分钟数(0-59)
          const s = date.getSeconds();  // 获取秒数(0-59)
          const time = `${h}:${m}:${s}`;
          const duration = Math.floor(item.duration/60) + 'mins ago';
          return (
            <div className="commentBox" key={item.id}>
              {/* header */}
              <div className="boxHeader">
                <span>{time}</span>
                <div className='verticalLine'></div>
                <span style={{color: "#9DA3AB"}}>{item.quote}</span>
              </div>

              {/* user */}
              <div className="user">
                <img src={item.avatar} className="img" />
                <div style={{marginLeft: '8px'}}>
                  <div>{item.nickname}</div>
                  <span style={{color: "#9DA3AB"}}>{duration}</span>
                </div>
              </div>

              {/* content */}
              <div className="wrapper">
                <input id={item.id} className={"exp"} type="checkbox" />
                <div className="text">
                  <label className="btn" htmlFor={item.id}>
                    <span style={{marginRight: "7px"}}></span>
                    <i className="iconfont icon-xiala"></i>
                  </label>
                  {item.content}
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default Widget