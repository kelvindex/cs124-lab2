# Decisions
Here we describe different design elements that we decided on including color scheme,
icons and how these attributes fit into the design

### Color Scheme
+ \#25274D for background color
+ White for text so legibility will be easy against the black background
+ \#86C232 for header so it stands out
+ \#333 for header background color to create an aesthetically pleasing header bar
+ This scheme was inspired by color palettes \#27 on [this website](https://visme.co/blog/website-color-schemes/)

Currently, the signedInApp only supports this "dark mode" but future iterations could have different,
potentially more accessible color schemes available

### Icons
+ Button for deleting; red so it signals something drastic is happening and data will
  be eminently lost
+ Toggle for show or hide items moreso indicates modality and indicates to the user
  that the action can be done and undone
+ ~~Pencil for editing. Disappears in editing more.~~
+ Checkbox for list items so they can be marked and unmarked depending on status of completion
+ Editing button for top level icon


# Alternatives
We briefly considered using different color schemes that were
brighter and more fun, but we figured it would ultimately be too
distracting.

Previous version of our signedInApp had a walk through element organized in 6 categories by
buttons on the page as such:

![Image of task list page](index.png)

Since there is no longer a walk through element, our design is much simpler. We also
got rid of some of our icons and buttons so for editing an entry, the user just clicks
on the entry itself instead of an icon; for adding one, the user just hits enter ass opposed
to a button.

# Challenges
A lot of difficulties with styling and making certain elements work. For
instance the toggle button was a lot more code than anticipated. We
also considered making the checkmarks more in tune with the color scheme
but that proved to also be more code than anticipated.

We decided convention could be kept in this instance, preserving the
checkmark in the checkbox against the blue background. It is not especially distracting in
our design.

Ordered all the different tasks the lab asked to be completed into an index of 6 different pages,
each with a walkthrough on how the task would be performed.

Additionally with implementing more on the backend came challenges with figuring out when
to use state variable and how to access data across different components. For instance,
storing state for different configurations of the list ie completed items, total items, and
all items except completed items. Of course, these all then need to be updated in the appropriate
places as it pertains to the task that needs to be carried out.

We also still need to fix adding long blocks of text to the task list,
as it currently does not wrap around properly. Currently deliberating between
switching to "textarea" refactor or figuring out different ways to manipulate the input
tag within css.


# Accomplishments
The final output of our pages appears pretty accessible and it displays pretty nicely on different screens.
Some key features include:

**The plain task list itself**

![](task_pre_complete.png)

**The delete button appears after an item has been marked**

![](checked_items.png)

**A popup when a user is about to delete completed tasks**

![](pop_up.png)

**Hiding completed items with the ability to still delete them
completely avaiable**

![](toggle_hide_complete.png)

**After Lab 4**
The signedInApp now has a side panel and icons for editing
![](side-panel.png)
![](new-list.png)

The app now also has proper accessibility options, with keyboard only and voice over usage.

Video showcasing accessibility options: https://www.youtube.com/watch?v=41dpJpfLSW0

(The keys used are only tab to move through items, space to select, enter to add items, and arrow keys to move through drop-down menus.)

As another note, while this pull request was made after 11pm, the lab was completed before then. We encountered many more issues with recording and uploading the video than expected, leading to this delayed submission.


**After Lab 5**
The app now displays user info and allows members of a list
to add other members
![](collab-window.png)
The app also displays which user is currently logged in
![](user-info.png)
Attempted to allow owner to remove collaborators but could not do so in time
Interface is a little clunky for small screen, but has heart
Also changed up the color scheme a little to make certain actions less scary and collaborators
button from which users can manage and view members of the team
![](new-list-display.png)