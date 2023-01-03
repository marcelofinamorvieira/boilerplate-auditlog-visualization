import { connect, IntentCtx, RenderPageCtx } from "datocms-plugin-sdk";
import { render } from "./utils/render";
import ConfigScreen from "./entrypoints/ConfigScreen";
import "datocms-react-ui/styles.css";
import AuditLogsPage from "./entrypoints/AuditLogsPage";

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  settingsAreaSidebarItemGroups(ctx: IntentCtx) {
    if (!ctx.currentRole.attributes.can_edit_schema) {
      return [];
    }
    return [
      {
        label: "AUDIT LOGS",
        items: [
          {
            label: "Audit Logs visualization",
            icon: "analytics",
            pointsTo: {
              pageId: "auditLogs",
            },
          },
        ],
      },
    ];
  },
  renderPage(pageId, ctx: RenderPageCtx) {
    switch (pageId) {
      case "auditLogs":
        return render(<AuditLogsPage ctx={ctx} />);
    }
  },
});
