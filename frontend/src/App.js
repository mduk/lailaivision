import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

const asset_host = 'http://localhost:8000';

export default function() {
  const [ files, setFiles ] = useState([]);

  useEffect(() => {
    (async function getdata() {
      const response = await axios({
        method: 'get',
        url: asset_host
      });

      setFiles(response.data);
    })();
  }, []);

  const rows = files.map(file => (
    <Table.Row>
      <Table.Cell collapsing>
        <img
          width="64"
          src={`${asset_host}/${file.AnimatedThumbnail}`}
        />
      </Table.Cell>
      <Table.Cell>{file.EventDate} {file.EventTime}</Table.Cell>
      <Table.Cell>{file.Duration} ({file.FileSize})</Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>&nbsp;</Table.HeaderCell>
          <Table.HeaderCell>File</Table.HeaderCell>
          <Table.HeaderCell>&nbsp;</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
}
