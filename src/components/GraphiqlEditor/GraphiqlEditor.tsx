import React, { useEffect } from 'react';
import { GraphiqlProps } from '../../utility/interface/props';
import GraphiQL from 'graphiql';
import './GraphiqlEditor.scss';
import 'graphiql/graphiql.min.css';
import Constants from '../../utility/constant';
import { useSelector } from 'react-redux';
import { EndpointState } from '../../utility/redux/state';

const buttonDisable = document.getElementsByClassName('toolbar-button');

const GraphiqlEditor: React.FunctionComponent<GraphiqlProps> = ({ props,drawerOpen }):  JSX.Element=> {

const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);


  useEffect(() => {
    if (buttonDisable && buttonDisable[3]) {
     
      let historyButton: HTMLElement = document.getElementsByClassName('toolbar-button')[3] as HTMLElement;
      let mergeButton: HTMLElement = document.getElementsByClassName('toolbar-button')[1] as HTMLElement;
      let docExplorerHide: HTMLElement = document.getElementsByClassName('docExplorerShow')[0] as HTMLElement;

      docExplorerHide.style.display='none';
      historyButton.style.display = 'none';
      mergeButton.style.display = 'none';
    }
  }, [props && props.loc]);

  return (
    <>
      <div className={drawerOpen ? "graphiQLEditor" :"graphiQLEditor-drawer-open"}>
        <GraphiQL
          fetcher={async (graphQLParams) => {
            const data = await fetch(endpoint, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(graphQLParams),
              credentials: 'same-origin',
            });

            return data.json().catch(() => data.text());
          }}
          editorTheme={'dracula'}
          readOnly={true}
          defaultVariableEditorOpen={false}
          defaultSecondaryEditorOpen={false}
          docExplorerOpen={false}
          headerEditorEnabled={false}
          query={props && props.loc ? props.loc.source.body : Constants.ERROR_MESSAGES.QUERY_ERROR}
        />
      </div>
    </>
  );
};

export default GraphiqlEditor;
