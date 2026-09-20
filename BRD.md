**Business Requirements Document (BRD)**

**Project Name**

**ÀJỌ - Community Savings Circle Management Platform**

**1. Business Overview**

ÀJỌ is a web-based platform that digitises traditional rotational
savings groups commonly used across African, Caribbean, and Black
diaspora communities.

Traditionally, these savings groups are managed through WhatsApp groups,
spreadsheets, notebooks, and manual record keeping. This often leads to
confusion, disputes, and administrative burden for organisers.

The purpose of ÀJỌ is to provide a transparent, centralised platform
where members can:

-   Create savings circles

-   Join circles

-   Track contributions

-   Monitor payout schedules

-   View member participation

-   Improve accountability and trust within the group

The platform is designed with women in mind as the primary audience but
may be used by anyone.

**2. Problem Statement**

Rotational savings groups rely heavily on trust and manual
administration.

Current challenges include:

-   No centralised record of contributions

-   Difficulty tracking who has paid

-   Unclear payout schedules

-   Administrative burden on organisers

-   Lack of transparency between members

-   Difficulty resolving disputes

-   No historical record of participation

A digital solution is required to improve visibility, accountability,
and trust while maintaining the simplicity of traditional savings
circles.

**3. Project Goals**

The application should:

1.  Allow users to create and manage savings circles

2.  Allow users to join circles using an invitation code

3.  Track member contributions

4.  Manage payout rotations

5.  Provide transparency for all members

6.  Reduce manual administration

7.  Maintain historical records of transactions and payouts

**4. User Roles**

**Member**

A member is a participant in a savings circle.

A member can:

-   Create an account

-   Log in

-   Join a circle

-   View circle information

-   Submit proof of contribution

-   View payout schedule

-   View their payment history

**Circle Organiser**

The organiser is responsible for managing a circle.

An organiser can:

-   Create a circle

-   Invite members

-   Approve contributions

-   Manage payout cycles

-   Monitor circle health

**5. Functional Requirements**

**FR1: User Registration**

**Description**

Users must be able to create an account.

**Acceptance Criteria**

-   User enters:

    -   First Name

    -   Last Name

    -   Email Address

    -   Password

-   Email must be unique.

-   User record is stored in database.

-   User can log in after registration.

**FR2: User Authentication**

**Description**

Users must be able to login securely.

**Acceptance Criteria**

-   User enters email and password.

-   Credentials are validated.

-   Successful login redirects user to dashboard.

-   Invalid credentials display an error message.

**FR3: Create Circle**

**Description**

Users must be able to create a savings circle.

**Circle Information**

-   Circle Name

-   Contribution Amount

-   Contribution Frequency

    -   Weekly

    -   Biweekly

    -   Monthly

-   Maximum Members

-   Start Date

**Acceptance Criteria**

-   Circle is saved.

-   Creator becomes organiser.

-   Unique invite code generated.

Example:

AJO-2948

**FR4: Join Circle**

**Description**

Users must be able to join a circle using an invite code.

**Acceptance Criteria**

-   User enters invite code.

-   System validates code.

-   User is added to circle.

-   User is assigned a payout position.

-   Circle member count updates.

**FR5: Circle Dashboard**

**Description**

All members should see a shared dashboard.

**Dashboard Must Display**

**Circle Information**

Circle Name

Contribution Amount

Current Cycle

Total Pot

**Members List**

Name

Position

Status

**Payment Tracker**

Paid

Pending

Late

Missed

**Payout Schedule**

Cycle 1 - Sarah

Cycle 2 - Ada

Cycle 3 - Grace

**FR6: Submit Contribution**

**Description**

Members should be able to record a contribution.

**Acceptance Criteria**

User can:

-   Enter payment amount

-   Submit payment

-   Upload proof of payment (optional stretch goal)

Status becomes:

Pending Approval

**FR7: Approve Contribution**

**Description**

The organiser verifies and approves payments.

**Acceptance Criteria**

Organiser can:

-   View submitted payments

-   Approve payment

-   Reject payment

Contribution status becomes:

Approved

or

Rejected

**FR8: Payout Management**

**Description**

Once all contributions for a cycle are approved, the system identifies
the payout recipient.

**Acceptance Criteria**

System:

-   Calculates total pot

-   Determines recipient

-   Creates payout record

-   Updates payout schedule

Example:

Total Pot: £500

Recipient:

Ada

Status:

Ready for Payout

**FR9: Activity Feed**

**Description**

Members should see circle activity.

**Acceptance Criteria**

Activity examples:

Sarah joined the circle

Ada submitted payment

Grace received payout

Tolu paid £50

Activities appear in chronological order.

**6. Non-Functional Requirements**

**Security**

-   Passwords must be encrypted

-   Users can only access circles they belong to

-   Authentication required for all protected pages

**Performance**

-   Dashboard loads within 3 seconds

-   API responses should be less than 2 seconds

**Usability**

-   Mobile-friendly design

-   Simple navigation

-   Clear payment statuses

**7. Stretch Goals (Nice-to-Have Features)**

**SG1: Trust Score**

Each member receives a score based on:

-   On-time payments

-   Missed payments

-   Completed cycles

Example:

Ada - 100%

Sarah - 92%

Grace - 87%

Purpose:

To promote accountability and trust.

**SG2: Circle Health Indicator**

Display group status.

Example:

Circle Health

✅ Healthy

Members Paid: 10/10

Current Pot: £500

Next Recipient: Ada

**SG3: Payment Reminders**

System sends reminders before due dates.

Examples:

Contribution due in 3 days

Contribution overdue

**SG4: Proof of Payment Upload**

Members upload screenshots.

Example:

payment-receipt.jpg

Organiser reviews before approval.

**SG5: Waiting List**

If circle reaches capacity:

Circle Full

Position in Queue: 2

Users automatically join when a space becomes available.
