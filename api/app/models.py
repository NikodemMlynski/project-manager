from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base

# Enuma do roli w projekcie
class RoleEnum(str, enum.Enum):
    OWNER = "owner"
    MEMBER = "member"

class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True, nullable=False)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(BigInteger, default=func.extract('epoch', func.now()), nullable=False)

    # Relacje
    projects = relationship("ProjectAssignee", back_populates="user")
    tasks = relationship("TaskAssignee", back_populates="user")

class Project(Base):
    __tablename__ = "project"

    id = Column(BigInteger, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    deadline = Column(DateTime, nullable=False)
    isFinished = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    description = Column(String, nullable=True)

    # Relacje
    tasks = relationship("Task", back_populates="project")
    assignees = relationship("ProjectAssignee", back_populates="project")

class Category(Base):
    __tablename__ = "category"

    id = Column(BigInteger, primary_key=True, nullable=False)
    name = Column(String, nullable=False)

    # Relacja
    tasks = relationship("Task", back_populates="category")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(BigInteger, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    project_id = Column(BigInteger, ForeignKey("project.id"), nullable=False)
    category_id = Column(BigInteger, ForeignKey("category.id"), nullable=True)
    isFinished = Column(Boolean, default=False)
    description = Column(String, nullable=True)

    # Relacje
    project = relationship("Project", back_populates="tasks")
    category = relationship("Category", back_populates="tasks")
    assignees = relationship("TaskAssignee", back_populates="task")

class ProjectAssignee(Base):
    __tablename__ = "project_assignees"

    id = Column(BigInteger, primary_key=True, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    project_id = Column(BigInteger, ForeignKey("project.id"), nullable=False)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)

    # Relacje
    project = relationship("Project", back_populates="assignees")
    user = relationship("User", back_populates="projects")

class TaskAssignee(Base):
    __tablename__ = "task_assignees"

    id = Column(BigInteger, primary_key=True, nullable=False)
    user_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    task_id = Column(BigInteger, ForeignKey("tasks.id"), nullable=False)

    # Relacje
    user = relationship("User", back_populates="tasks")
    task = relationship("Task", back_populates="assignees")
