# CODING GUIDELINES

## Naming Conventions
In general, make sure that all names tell the reader what that variable/function/file does. It should be obvious to another programmer what the variable/function/file handles.

**Variable Names**: under_score

**Function Names**: camelCase

**File Names**: under_score

**Component Names**: ComponentName

**CSS Class Names**: class-name

**React State Variables**: const [videos_list, setVideosList] = useState([]); *// Short comment that describes what state variable does*

**React Props Variables**: under_score


## Commenting Code
**General Commenting Rules** 
1. Every file should have a comment that describes what functionality is handled within that file.
2. Add comments above every function name to declare what the function does.
3. Add comments before any potentially confusing line of code to clarify what the line of code does.
4. Add comments to separate the imports in each file legibly. Example:

<pre><code>// React imports
import React, { useState, useEffect } from "react";

// Module imports
import io from "socket.io-client";

// Component imports
import InfoBar from "./info_bar";
import Input from "./input";
import Messages from "./messages";

// Styles imports
import "./chat.scss";
</code></pre>

**Adding comments:**
<pre><code>// Comments that describe what a function does should go here.
const create_page = () => {
     // Longer comments describing variables or lines of code should go here.
     const file_name = “abc” // Short comments go here.
}</code></pre>

Add short comments if possible; for complicated lines of code, use a longer comment. Don’t use both!


## Github
**Commits**: Every github commit should have a message that indicates what functionality the commit contains. If someone else goes through the commit history, they should easily be able to figure out what the commit accomplished.

**Commit message format**: "NAME OF PAGE OR FEATURE | message that describes in a bit more detail"

**Making Commits**: Commits should only handle single features or additions. Commits should be made often (also because it makes you look more active on Github).

**Creating Branches**: Every branch should be task-specific. If you are assigned a task on Asana, then create a branch to complete that task. Only work on that task within that branch. When naming a branch, use the under_score convention as described at the top of this document.

**Pull requests**: DO NOT run “git merge” into master without permission. When merging to master, create a pull request on Github before merging and assign one person to review the merge. (close the branch if there are no more future edits). 


## How to Split React Components into Smaller Components
Any element that is repeatable or elements that can be grouped into one should be an individual component. Only pass the necessary properties to the child component to clean them as clean as possible.


## Dealing with Warnings
Make sure that there are no minor warnings when the code is compiling. With any warning, look into it and see why it comes up, and attempt to fix it.
Also, it is extremely important to also check warnings that appear in the web console. Warnings that aren’t shown in Visual Studio or any other IDE can still appear in the web console.


## Creating Styles Files
Each folder within the component folder tree should have 1 style file. Each of these should import the main styles.scss file. If there are any styles that are common on multiple pages of the website, add that style to the main styles.scss file.


## Don’t Hardcode Anything
Make sure that all functions are written in a scalable way. For example, if there are only two videos that you want to display within a grid, make sure that the grid is rendered programmatically based on an API call that gets the list of videos, rather than rendering two videos itself.


### **HAPPY CODING!**
