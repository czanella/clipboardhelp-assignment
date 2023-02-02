# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

---
## _Add new table `Facilities_Agents`_

This is a table that associates Facilities and Agents, which creates a many-to-many relation between both and lets each Facility add custom information regarding each Agent. The columns in this table are:

* facility_id: foreign key pointing to Facilities table's id column
* agent_id: foreign key pointing to Agents table's id column
* custom_agent_id: stores the custom ids that each Facility creates for each Agent

The columns facility_id and agent_id combined should form a compound key, to prevent a Facility from adding multiple custom Agent ids for a single Agent.

The work on this ticket should encompass the database migration.

---
## _Update API to add a new endpoint_

(Supposing our API to be a RESTful one)
The API that manages and popuplates our data should be updated to include and change endpoints to manage the new information:

* Add a new endpoint associated with the new Facility-Agent custom id
* Should accept the verbs GET (retrieve), POST (create), PUT (update) and DELETE (remove)
* Add unit and integration tests for this new featuer
* Add a feature flag to control this new feature

---
## _Update management board_

The interface that manages our system should be updated to let each Facility input custom Agent ids.

* Add new interface resources (views, form fields, etc.) necessary to manage the new custom Agent ids
* This should be controlled by the same feature flag created in ticket 2
* Add integration tests (e.g. Cypress) to test this feature
* Optional: this can be deployed as it is at this point, so that Facilities can populate their custom Agent ids while the next tickets are being implemented

---
## _Update `getShiftsByFacility` to include new custom Agent id_

The `getShiftsByFacility` function should be updated to retrieve the newly added custom Agent ids.

* If a Facility didn't set up a custom id for an Agent in an already existing Shift, that agent's internal database ID should be retrieved as `null`.
* Existing tests (unit, integration, etc.) that involve `getShiftsByFacility` should be updated
* Update documentation related to `getShiftsByFacility`

---
## _Update `generateReport` function_

The `generateReport` function should be updated to use the new custom Agent ids.

* If a Facility didn't set up a custom id for an Agent in an already existing Shift and `getShiftsByFacility` returns `null` for a custom Agent id, then that Agent's database id should be used in the PDF report instead. This ensures that the system will continue to work as before if no Facilities have entered new custom Agent ids
* Existing tests (unit, integration, etc.) that involve `generateReport` should be updated
* Update documentation related to `generateReport`
* After this ticket is deployed and tested, the feature flag can be turned on