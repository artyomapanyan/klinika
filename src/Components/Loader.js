import React from 'react';
import { Spin } from 'antd';


function Loader ({small,fullWidth,background}) {
    return (
      <div style={{
        padding: small??150, background:background, minHeight: small??360, margin: '0 auto', textAlign: 'center',
        width:fullWidth?'100%':'auto',
          borderRadius: 22,
          color:'white'
      }}
      >
        <Spin size="large"/>
      </div>

    )

}

export default Loader;
