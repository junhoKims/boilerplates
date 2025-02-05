'use client';

import { css } from '../../../styled-system/css';

const styles = css({
  backgroundColor: 'blue',
  borderRadius: '9999px',
  fontSize: '13px',
  padding: '10px 15px',
});

export const PandaView = () => {
  return (
    <div className={styles}>
      <h5>Panda View</h5>
      <div>
        <p>view component</p>
      </div>
    </div>
  );
};
