import { buildClient } from "@datocms/cma-client-browser";
import { RenderPageCtx } from "datocms-plugin-sdk";
import { Canvas } from "datocms-react-ui";
import { useEffect, useState } from "react";

type PropTypes = {
  ctx: RenderPageCtx;
};

const getAuditLogs = async (
  { ctx }: PropTypes,
  setLogs: React.Dispatch<any>
) => {
  const client = buildClient({
    //creates a client that will be used to make the API requests
    apiToken: ctx.currentUserAccessToken as string,
  });

  const now = new Date();
  const lastMonthTimestamp = now.setMonth(now.getMonth() - 1).valueOf(); //get unix timestamp of last month

  const auditLogEvents = await client.auditLogEvents.query({
    //get all audit events from the last month
    filter: `id <= min_ulid(${lastMonthTimestamp})`,
    detailed_log: false,
  });

  console.log(auditLogEvents);

  setLogs(auditLogEvents);
};

function AuditLogsPage({ ctx }: PropTypes) {
  const [logs, setLogs] = useState<any>(null); //i didn't type the log, so i used a lazy any

  useEffect(() => {
    getAuditLogs({ ctx }, setLogs);
  }, []);

  return (
    <Canvas ctx={ctx}>
      {logs &&
        logs.map((log: any) => {
          return (
            <div key={log.id}>
              <p>Actor: {log.actor.name}</p>
              <p>Action: {log.action_name}</p>
              <p>Item ID: {log.request.path.split("/")[2]}</p>
              <p>Time: {log.meta.occurred_at}</p>
              <hr></hr>
            </div>
          );
        })}
    </Canvas>
  );
}

export default AuditLogsPage;
