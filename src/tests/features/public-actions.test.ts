import { beforeEach, describe, expect, it, vi } from "vitest";

import { writeActivityLog } from "@/db/queries/analytics";
import { createContactSubmission } from "@/db/queries/contacts";
import {
  createOpportunity,
  createOpportunityApplication,
  listPublishedOpportunityPosts
} from "@/db/queries/opportunities";
import { createWaitlistEntry } from "@/db/queries/waitlists";
import { contactSubmissionSchema } from "@/features/contacts/schemas";
import { submitContactAction } from "@/features/contacts/actions";
import {
  opportunityApplicationSchema,
  opportunitySubmissionSchema
} from "@/features/opportunities/schemas";
import {
  submitOpportunityAction,
  submitOpportunityApplicationAction
} from "@/features/opportunities/actions";
import { waitlistSubmissionSchema } from "@/features/waitlists/schemas";
import { submitWaitlistAction } from "@/features/waitlists/actions";

vi.mock("@/db/queries/analytics", () => ({
  writeActivityLog: vi.fn()
}));

vi.mock("@/db/queries/contacts", () => ({
  createContactSubmission: vi.fn()
}));

vi.mock("@/db/queries/opportunities", () => ({
  createOpportunity: vi.fn(),
  createOpportunityApplication: vi.fn(),
  listPublishedOpportunityPosts: vi.fn()
}));

vi.mock("@/db/queries/waitlists", () => ({
  createWaitlistEntry: vi.fn()
}));

vi.mock("@/lib/request", () => ({
  getRequestMetadata: vi.fn(async () => ({
    ipAddress: "203.0.113.10",
    userAgent: "vitest"
  }))
}));

const validContact = {
  firstName: "Aarav",
  lastName: "Mehta",
  email: "aarav@example.com",
  phone: "+919999999999",
  message: "We want to discuss a ProBlend machine for our gym.",
  sourcePath: "/contact",
  honeypot: ""
};

const validOpportunity = {
  opportunityKind: "venue",
  identityType: "venue_owner",
  contactName: "Riya Kapoor",
  designation: "Founder",
  email: "riya@example.com",
  phone: "+919888888888",
  organizationName: "Peak Room Fitness",
  city: "New Delhi",
  state: "Delhi",
  region: "South Delhi",
  hasMultiCityAccess: false,
  locationTypes: ["gym", "office_campus"],
  accessMethod: "We own and operate the venue.",
  relationshipStrength: "direct_owner",
  authorityLevel: "final_decision",
  venueCount: 1,
  approximateDailyFootfall: 420,
  reachDescription: "Members, trainers, and daily trial visitors.",
  expectedMachineCount: 1,
  availableSpace: "Reception wall with 7 ft clear height.",
  electricityReadiness: "ready",
  internetReadiness: "can_arrange",
  siteAccessConstraints: "Lift access available.",
  commercialIntent: "revenue_share",
  notes: "Open to a launch sampling day.",
  sourcePath: "/submit-opportunity",
  honeypot: ""
};

const validNetworkOpportunity = {
  opportunityKind: "city_network",
  identityType: "distributor",
  contactName: "Kabir Anand",
  email: "kabir@example.com",
  phone: "+918888888888",
  organizationName: "North Market Access",
  city: "Chandigarh",
  state: "Chandigarh",
  region: "Tri-city",
  hasMultiCityAccess: true,
  locationTypes: ["distributor_network"],
  accessMethod: "We can open conversations with operators across the region.",
  reachDescription: "Distributor relationships across gyms and office parks.",
  sourcePath: "/business-solutions",
  honeypot: ""
};

const validIntroductionOpportunity = {
  opportunityKind: "introduction",
  identityType: "strategic_introducer",
  contactName: "Meera Nair",
  email: "meera@example.com",
  phone: "+917777777771",
  organizationName: "Campus Advisors",
  city: "Bengaluru",
  state: "Karnataka",
  locationTypes: ["strategic_introduction"],
  accessMethod: "I can introduce ProBlend to a campus facilities lead.",
  relationshipStrength: "warm_introduction",
  authorityLevel: "introducer",
  sourcePath: "/partner-with-problend",
  honeypot: ""
};

const validApplication = {
  opportunityPostId: "7b096d77-2196-480f-b8d6-4dc642f60836",
  contactName: "Neel Sharma",
  email: "neel@example.com",
  phone: "+917777777777",
  organizationName: "North Campus Operators",
  city: "Delhi",
  state: "Delhi",
  intent: "We can introduce high-footfall college venues.",
  message: "We have direct relationships with two campus administrators.",
  sourcePath: "/business-solutions",
  honeypot: ""
};

const validWaitlist = {
  name: "Ananya Singh",
  email: "ananya@example.com",
  phone: "+916666666666",
  city: "Jaipur",
  state: "Rajasthan",
  interestType: "venue",
  notes: "Please notify us when ProBlend is active here.",
  sourcePath: "/business-solutions",
  honeypot: ""
};

function toFormData(input: Record<string, unknown>) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        formData.append(key, String(item));
      }
    } else if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  return formData;
}

describe("public acquisition schemas", () => {
  it("parses valid and invalid contact submissions", () => {
    expect(contactSubmissionSchema.safeParse(validContact).success).toBe(true);
    expect(contactSubmissionSchema.safeParse({ ...validContact, email: "bad" }).success).toBe(false);
    expect(contactSubmissionSchema.safeParse({ ...validContact, honeypot: "bot-filled" }).success).toBe(false);
  });

  it("parses valid and invalid opportunity submissions", () => {
    const parsedVenue = opportunitySubmissionSchema.safeParse(validOpportunity);
    const parsedNetwork = opportunitySubmissionSchema.safeParse(validNetworkOpportunity);
    const parsedIntroduction = opportunitySubmissionSchema.safeParse(validIntroductionOpportunity);

    expect(parsedVenue.success).toBe(true);
    expect(parsedNetwork.success).toBe(true);
    expect(parsedIntroduction.success).toBe(true);

    if (!parsedVenue.success || !parsedNetwork.success || !parsedIntroduction.success) {
      throw new Error("Expected branch opportunity fixtures to parse");
    }

    expect(parsedVenue.data.opportunityKind).toBe("venue");
    expect(parsedNetwork.data.opportunityKind).toBe("city_network");
    expect(parsedNetwork.data.relationshipStrength).toBe("unknown");
    expect(parsedNetwork.data.electricityReadiness).toBe("unknown");
    expect(parsedNetwork.data.commercialIntent).toBe("open_discussion");
    expect(parsedIntroduction.data.details).toEqual(
      expect.objectContaining({
        branch: "introduction"
      })
    );

    expect(opportunitySubmissionSchema.safeParse({ ...validOpportunity, opportunityKind: "open_brief" }).success).toBe(false);
    expect(opportunitySubmissionSchema.safeParse({ ...validOpportunity, honeypot: "bot-filled" }).success).toBe(false);
    expect(opportunitySubmissionSchema.safeParse({ ...validOpportunity, phone: "" }).success).toBe(false);
    expect(opportunitySubmissionSchema.safeParse({ ...validOpportunity, locationTypes: ["not-real"] }).success).toBe(false);
    expect(
      opportunitySubmissionSchema.safeParse({
        ...validOpportunity,
        locationTypes: Array.from({ length: 20 }, (_, index) => `gym-${index}`)
      }).success
    ).toBe(false);
  });

  it("parses valid and invalid opportunity applications", () => {
    const parsed = opportunityApplicationSchema.safeParse(validApplication);

    expect(parsed.success).toBe(true);
    if (!parsed.success) {
      throw new Error("Expected valid opportunity application to parse");
    }
    expect(parsed.data.sourcePath).toBe("/business-solutions");
    expect(opportunityApplicationSchema.safeParse({ ...validApplication, opportunityPostId: "not-a-uuid" }).success).toBe(false);
    expect(opportunityApplicationSchema.safeParse({ ...validApplication, honeypot: "bot-filled" }).success).toBe(false);
  });

  it("parses valid and invalid waitlist submissions", () => {
    expect(waitlistSubmissionSchema.safeParse(validWaitlist).success).toBe(true);
    expect(waitlistSubmissionSchema.safeParse({ ...validWaitlist, email: "bad" }).success).toBe(false);
    expect(waitlistSubmissionSchema.safeParse({ ...validWaitlist, honeypot: "bot-filled" }).success).toBe(false);
  });
});

describe("public acquisition actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(writeActivityLog).mockResolvedValue({ id: "activity-id" } as never);
    vi.mocked(listPublishedOpportunityPosts).mockResolvedValue([
      {
        id: validApplication.opportunityPostId,
        title: "Campus introduction",
        slug: "campus-introduction",
        category: "strategic_introduction",
        summary: "Introduce ProBlend to campus venues.",
        locationScope: "Delhi",
        commercialModel: "open_discussion",
        requirements: [],
        isPublished: true,
        publishedAt: new Date(),
        status: "open",
        displayOrder: 0,
        closesAt: null,
        createdBy: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ] as never);
  });

  it("returns a successful contact action result and writes public activity", async () => {
    vi.mocked(createContactSubmission).mockResolvedValue({ id: "contact-id" } as never);

    const result = await submitContactAction(null, toFormData(validContact));

    expect(result).toEqual({
      ok: true,
      id: "contact-id",
      message: "Thanks for submitting!"
    });
    expect(createContactSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        email: validContact.email,
        sourcePath: "/contact"
      })
    );
    expect(writeActivityLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actorType: "public",
        action: "contact_submitted",
        entityType: "contact_submission",
        entityId: "contact-id"
      })
    );
  });

  it("returns field errors and skips persistence for invalid contact input", async () => {
    const result = await submitContactAction(null, toFormData({ ...validContact, email: "bad" }));

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected contact action to fail");
    }
    expect(result.fieldErrors?.email).toBeDefined();
    expect(createContactSubmission).not.toHaveBeenCalled();
    expect(writeActivityLog).not.toHaveBeenCalled();
  });

  it("rejects filled honeypot fields before contact persistence", async () => {
    const result = await submitContactAction(null, toFormData({ ...validContact, honeypot: "bot-filled" }));

    expect(result.ok).toBe(false);
    expect(createContactSubmission).not.toHaveBeenCalled();
    expect(writeActivityLog).not.toHaveBeenCalled();
  });

  it("rejects filled honeypot fields before opportunity persistence", async () => {
    const result = await submitOpportunityAction(null, toFormData({ ...validOpportunity, honeypot: "bot-filled" }));

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected opportunity action to reject honeypot input");
    }
    expect(result.fieldErrors?.honeypot).toBeDefined();
    expect(createOpportunity).not.toHaveBeenCalled();
    expect(writeActivityLog).not.toHaveBeenCalled();
  });

  it("returns a successful opportunity action result", async () => {
    vi.mocked(createOpportunity).mockResolvedValue({ id: "opportunity-id" } as never);

    const result = await submitOpportunityAction(null, toFormData(validOpportunity));

    expect(result).toEqual({
      ok: true,
      id: "opportunity-id",
      message: "Thanks. We've received it and will review it."
    });
    expect(createOpportunity).toHaveBeenCalledWith(
      expect.objectContaining({
        city: "New Delhi",
        identityType: "venue_owner",
        locationTypes: ["gym", "office_campus"],
        opportunityKind: "venue",
        sourcePath: "/submit-opportunity",
        details: expect.objectContaining({
          branch: "venue"
        })
      })
    );
    expect(writeActivityLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actorType: "public",
        action: "opportunity_submitted",
        entityType: "opportunity",
        entityId: "opportunity-id"
      })
    );
  });

  it("returns a successful opportunity application action result", async () => {
    vi.mocked(createOpportunityApplication).mockResolvedValue({ id: "application-id" } as never);

    const result = await submitOpportunityApplicationAction(null, toFormData(validApplication));

    expect(result).toEqual({
      ok: true,
      id: "application-id",
      message: "Thanks. ProBlend has received your application."
    });
    expect(createOpportunityApplication).toHaveBeenCalledWith(
      expect.objectContaining({
        opportunityPostId: validApplication.opportunityPostId,
        email: validApplication.email,
        sourcePath: "/business-solutions"
      })
    );
    expect(writeActivityLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actorType: "public",
        action: "opportunity_application_submitted",
        entityType: "opportunity_application",
        entityId: "application-id"
      })
    );
  });

  it("rejects opportunity applications for unpublished public posts", async () => {
    vi.mocked(listPublishedOpportunityPosts).mockResolvedValue([] as never);

    const result = await submitOpportunityApplicationAction(null, toFormData(validApplication));

    expect(result.ok).toBe(false);
    if (result.ok) {
      throw new Error("Expected application action to reject unpublished posts");
    }
    expect(result.fieldErrors?.opportunityPostId).toBeDefined();
    expect(createOpportunityApplication).not.toHaveBeenCalled();
  });

  it("rejects filled honeypot fields before opportunity application persistence", async () => {
    const result = await submitOpportunityApplicationAction(null, toFormData({ ...validApplication, honeypot: "bot-filled" }));

    expect(result.ok).toBe(false);
    expect(createOpportunityApplication).not.toHaveBeenCalled();
    expect(writeActivityLog).not.toHaveBeenCalled();
  });

  it("returns a successful waitlist action result", async () => {
    vi.mocked(createWaitlistEntry).mockResolvedValue({ id: "waitlist-id" } as never);

    const result = await submitWaitlistAction(null, toFormData(validWaitlist));

    expect(result).toEqual({
      ok: true,
      id: "waitlist-id",
      message: "Thanks. ProBlend has recorded your city interest."
    });
    expect(createWaitlistEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        city: "Jaipur",
        interestType: "venue",
        sourcePath: "/business-solutions"
      })
    );
    expect(writeActivityLog).toHaveBeenCalledWith(
      expect.objectContaining({
        actorType: "public",
        action: "waitlist_joined",
        entityType: "waitlist_entry",
        entityId: "waitlist-id"
      })
    );
  });

  it("rejects filled honeypot fields before waitlist persistence", async () => {
    const result = await submitWaitlistAction(null, toFormData({ ...validWaitlist, honeypot: "bot-filled" }));

    expect(result.ok).toBe(false);
    expect(createWaitlistEntry).not.toHaveBeenCalled();
    expect(writeActivityLog).not.toHaveBeenCalled();
  });

  it("does not ask users to retry when public activity logging fails after persistence", async () => {
    vi.mocked(createContactSubmission).mockResolvedValue({ id: "contact-id" } as never);
    vi.mocked(writeActivityLog).mockRejectedValue(new Error("activity unavailable") as never);

    const result = await submitContactAction(null, toFormData(validContact));

    expect(result).toEqual({
      ok: true,
      id: "contact-id",
      message: "Thanks for submitting!"
    });
  });
});
