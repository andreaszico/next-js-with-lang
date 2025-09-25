# Use Cases

## Existing Use Cases from README.md
1. Bloggers: Write, publish, and track posts with an intuitive editor.
2. Readers: Discover posts via search/tags, engage with comments/likes.
3. Teams: Collaborate with role-based permissions for multi-author blogs.
4. Portfolios: Showcase articles with a clean, shareable interface.
5. Education: Host tutorials with rich media support.

## Detailed Use Cases

### 1. Blog Management
#### 1.1 Create Blog Post
- **Actor**: Author, Admin
- **Description**: User creates a new blog post with title, content, tags, and optional images
- **Preconditions**: User is authenticated with Author or Admin role
- **Main Flow**:
  1. User navigates to "Create Post" page
  2. User fills in post title
  3. User writes content using the rich text editor (Tiptap)
  4. User adds tags to categorize the post
  5. User optionally uploads images
  6. User clicks "Publish" or "Save as Draft"
  7. System validates the input
  8. System saves the post to the database
  9. System redirects user to the post or back to editor based on action

#### 1.2 Edit Blog Post
- **Actor**: Author (own posts), Admin (all posts)
- **Description**: User modifies an existing blog post
- **Preconditions**: User is authenticated and has permission to edit the post
- **Main Flow**:
  1. User navigates to their dashboard or the post page
  2. User selects the "Edit" option for a post
  3. User modifies the post content in the editor
  4. User clicks "Save"
  5. System updates the post in the database
  6. System maintains version history of the post

#### 1.3 Delete Blog Post
- **Actor**: Author (own posts), Admin (all posts)
- **Description**: User removes a blog post with option for soft delete
- **Preconditions**: User is authenticated and has permission to delete the post
- **Main Flow**:
  1. User navigates to their dashboard or the post page
  2. User selects the "Delete" option for a post
  3. System shows confirmation dialog
  4. User confirms deletion
  5. System marks post as deleted (soft delete) in the database

#### 1.4 View Blog List
- **Actor**: Reader, Author, Admin
- **Description**: User views a paginated list of blog posts with search and filter options
- **Preconditions**: None
- **Main Flow**:
  1. User visits the main blog page
  2. System displays paginated list of published posts
  3. User can search posts by keywords
  4. User can filter posts by tags or categories
  5. User can sort posts by date, popularity, etc.

#### 1.5 View Blog Detail
- **Actor**: Reader, Author, Admin
- **Description**: User views the full content of a blog post with comments and related posts
- **Preconditions**: None
- **Main Flow**:
  1. User clicks on a blog post from the list
  2. System displays the full post content
  3. System shows related posts based on tags/categories
  4. System displays comment section
  5. User can interact with the post (like, share)

### 2. Authentication
#### 2.1 User Registration
- **Actor**: Unregistered User
- **Description**: New user creates an account
- **Preconditions**: User does not have an account
- **Main Flow**:
  1. User visits the registration page
  2. User fills in required information (email, password, name)
  3. User submits the registration form
  4. System validates the input
  5. System sends verification email
  6. User verifies email through the link
  7. System activates the user account

#### 2.2 User Login
- **Actor**: Registered User
- **Description**: User accesses their account
- **Preconditions**: User has a registered account
- **Main Flow**:
  1. User visits the login page
  2. User enters email and password
  3. User submits credentials
  4. System validates credentials
  5. System creates user session
  6. User is redirected to dashboard or previous page

#### 2.3 Password Reset
- **Actor**: Registered User
- **Description**: User resets their forgotten password
- **Preconditions**: User has a registered account
- **Main Flow**:
  1. User clicks "Forgot Password" on login page
  2. User enters their email address
  3. System sends password reset link to email
  4. User clicks the reset link
  5. User enters new password
  6. System updates password in database

### 3. User Profiles
#### 3.1 View Dashboard
- **Actor**: Author, Admin
- **Description**: User views their personalized dashboard with posts, drafts, and stats
- **Preconditions**: User is authenticated
- **Main Flow**:
  1. User navigates to dashboard
  2. System displays user's published posts
  3. System displays user's draft posts
  4. System shows user statistics (views, likes, comments)
  5. User can perform actions on their posts

#### 3.2 Edit Profile
- **Actor**: Reader, Author, Admin
- **Description**: User updates their profile information
- **Preconditions**: User is authenticated
- **Main Flow**:
  1. User navigates to profile settings
  2. User updates information (name, bio, avatar)
  3. User saves changes
  4. System updates profile in database

#### 3.3 Follow Authors
- **Actor**: Reader
- **Description**: User follows authors to get a curated feed
- **Preconditions**: User is authenticated
- **Main Flow**:
  1. User visits an author's profile
  2. User clicks "Follow" button
  3. System creates follow relationship
  4. User sees author's posts in their feed

### 4. Comments
#### 4.1 Add Comment
- **Actor**: Reader, Author, Admin
- **Description**: User adds a comment to a blog post
- **Preconditions**: User is authenticated
- **Main Flow**:
  1. User navigates to a blog post
  2. User writes a comment in the comment box
  3. User submits the comment
  4. System validates and saves the comment
  5. System displays the comment with real-time updates

#### 4.2 Like Comment
- **Actor**: Reader, Author, Admin
- **Description**: User likes a comment
- **Preconditions**: User is authenticated
- **Main Flow**:
  1. User views a comment
  2. User clicks the "Like" button on the comment
  3. System increments the like count
  4. System updates the UI to reflect the like

#### 4.3 Moderate Comments
- **Actor**: Admin
- **Description**: Admin moderates comments on posts
- **Preconditions**: User is authenticated with Admin role
- **Main Flow**:
  1. Admin navigates to comment moderation section
  2. Admin views reported or flagged comments
  3. Admin can approve, delete, or flag comments
  4. System updates comment status

### 5. Search & Tags
#### 5.1 Search Posts
- **Actor**: Reader, Author, Admin
- **Description**: User searches for posts using keywords
- **Preconditions**: None
- **Main Flow**:
  1. User enters keywords in search box
  2. System performs full-text search using Algolia or simple indexing
  3. System displays search results
  4. User can refine search with filters

#### 5.2 Filter by Tags
- **Actor**: Reader, Author, Admin
- **Description**: User filters posts by tags
- **Preconditions**: None
- **Main Flow**:
  1. User visits blog page
  2. User selects one or more tags
  3. System filters posts by selected tags
  4. System displays filtered results

#### 5.3 View Recommended Posts
- **Actor**: Reader, Author, Admin
- **Description**: User views recommended posts based on activity
- **Preconditions**: None
- **Main Flow**:
  1. User visits blog page or post detail
  2. System displays recommended posts based on user activity
  3. User can click on recommended posts to view them

### 6. Admin Tools
#### 6.1 View Analytics
- **Actor**: Admin
- **Description**: Admin views dashboard analytics for post views and engagement
- **Preconditions**: User is authenticated with Admin role
- **Main Flow**:
  1. Admin navigates to analytics dashboard
  2. System displays charts and metrics for:
     - Post views over time
     - User engagement
     - Popular posts
     - User growth
  3. Admin can filter analytics by date range

#### 6.2 Manage Users
- **Actor**: Admin
- **Description**: Admin manages user accounts
- **Preconditions**: User is authenticated with Admin role
- **Main Flow**:
  1. Admin navigates to user management section
  2. Admin can view all users
  3. Admin can change user roles (Reader, Author, Admin)
  4. Admin can deactivate/suspend users
  5. Admin can delete users

#### 6.3 Moderate Content
- **Actor**: Admin
- **Description**: Admin moderates posts and comments
- **Preconditions**: User is authenticated with Admin role
- **Main Flow**:
  1. Admin navigates to content moderation section
  2. Admin views flagged posts or comments
  3. Admin can approve, edit, or delete content
  4. Admin can ban users for inappropriate content

### 7. Extras
#### 7.1 Toggle Dark Mode
- **Actor**: Reader, Author, Admin
- **Description**: User switches between light and dark themes
- **Preconditions**: None
- **Main Flow**:
  1. User clicks on theme toggle in the UI
  2. System switches between light and dark mode
  3. System saves preference for future visits

#### 7.2 Access RSS Feed
- **Actor**: Reader
- **Description**: User subscribes to blog updates via RSS
- **Preconditions**: None
- **Main Flow**:
  1. User visits RSS feed URL
  2. System generates RSS feed of recent posts
  3. User's RSS reader consumes the feed