import { describe, expect, it } from "vitest";

import * as adminQueries from "@/db/queries/admin";
import * as analyticsQueries from "@/db/queries/analytics";
import * as contactQueries from "@/db/queries/contacts";
import * as forecastQueries from "@/db/queries/forecasts";
import * as opportunityQueries from "@/db/queries/opportunities";
import * as waitlistQueries from "@/db/queries/waitlists";

const expectedExports = {
  admin: {
    module: adminQueries,
    names: [
      "createAdminSession",
      "createAdminUser",
      "getAdminByEmail",
      "getAdminById",
      "revokeAdminSession"
    ]
  },
  analytics: {
    module: analyticsQueries,
    names: ["trackAnalyticsEvent", "writeActivityLog", "writeAuditLog"]
  },
  contacts: {
    module: contactQueries,
    names: ["createContactSubmission", "listContactSubmissions", "updateContactStatus"]
  },
  forecasts: {
    module: forecastQueries,
    names: [
      "createCalculatorSubmission",
      "createForecastRun",
      "createOpportunityScore",
      "getActiveForecastConfigVersion",
      "listForecastRuns"
    ]
  },
  opportunities: {
    module: opportunityQueries,
    names: [
      "createOpportunity",
      "createOpportunityApplication",
      "createOpportunityPost",
      "getOpportunityById",
      "listOpportunities",
      "listOpportunityApplications",
      "listOpportunityPosts",
      "listPublishedOpportunityPosts",
      "updateOpportunityStatus"
    ]
  },
  waitlists: {
    module: waitlistQueries,
    names: ["createWaitlistEntry", "listWaitlistEntries"]
  }
};

describe("database query boundary", () => {
  it("exposes the Task 2 data-access modules without UI or route handlers", () => {
    for (const boundary of Object.values(expectedExports)) {
      expect(Object.keys(boundary.module).sort()).toEqual(boundary.names.slice().sort());

      for (const name of boundary.names) {
        expect(boundary.module[name as keyof typeof boundary.module]).toEqual(expect.any(Function));
      }
    }
  });
});
